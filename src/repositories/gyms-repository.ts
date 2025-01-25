import { Gym } from '@/entities/gym';

export interface GymsRepository{

	findById(id:string):Promise<Gym | null>

}