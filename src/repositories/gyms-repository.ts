import { Gym } from '@/entities/gym';

export interface GymsRepository{

	findById(id:string):Promise<Gym | null>

	create(data:Gym):Promise<Gym>

	searchMany(query:string,page:number):Promise<Gym[]>

}