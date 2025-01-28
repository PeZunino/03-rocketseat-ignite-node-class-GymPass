import { randomUUID } from 'node:crypto';
import { Gym, Prisma } from '@prisma/client';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { findManyNearbyParams, GymsRepository } from '../gyms-repository';

export class InMemoryGymsRepository implements GymsRepository{
	public items: Gym[] = [];

	async create(data: Prisma.GymCreateInput): Promise<Gym> {
		const gym:Gym = {
			id: data.id ?? randomUUID(),
			latitude:  new Prisma.Decimal(data.latitude.toString()),
			longitude:  new Prisma.Decimal(data.longitude.toString()),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null
		};

		this.items.push(gym);

		return gym;
	}
	
	async findById(id: string): Promise<Gym | null> {
		const gym = this.items.find(items=>items.id === id);  

		if(!gym){
			return null;
		}

		return gym;
	}

	async searchMany(query: string, page: number): Promise<Gym[]> {
		return this.items.filter(item=>item.title.includes(query))
			.slice((page - 1) * 20,page * 20);
	}

	async findManyNearby(params: findManyNearbyParams): Promise<Gym[]> {
		return this.items.filter(item=>{
			const distance = getDistanceBetweenCoordinates({
				latitude: params.latitude,
				longitude: params.longitude
			},{
				latitude: item.latitude.toNumber(),
				longitude: item.longitude.toNumber(),
			});

			return distance < 10;
		});
	}
}