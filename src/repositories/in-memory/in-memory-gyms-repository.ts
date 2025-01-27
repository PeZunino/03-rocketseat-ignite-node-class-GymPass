import { randomUUID } from 'node:crypto';
import { Gym } from '@/entities/gym';
import { GymsRepository } from '../gyms-repository';

export class InMemoryGymsRepository implements GymsRepository{
	public items: Gym[] = [];

	async create(data: Gym): Promise<Gym> {
		const gym:Gym = {
			id: data.id ?? randomUUID(),
			latitude: data.latitude,
			longitude: data.longitude,
			title: data.title,
			checkIns: data.checkIns,
			description: data.description,
			phone: data.phone
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
}