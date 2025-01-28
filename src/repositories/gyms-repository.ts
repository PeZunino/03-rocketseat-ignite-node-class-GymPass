import { Gym } from '@/entities/gym';

export interface findManyNearbyParams{
	latitude:number,
	longitude:number
}

export interface GymsRepository{

	findById(id:string):Promise<Gym | null>

	create(data:Gym):Promise<Gym>

	searchMany(query:string,page:number):Promise<Gym[]>

	findManyNearby(params: findManyNearbyParams):Promise<Gym[]>
}