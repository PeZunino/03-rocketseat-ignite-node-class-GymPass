import { Gym } from '@/entities/gym';
import { GymsRepository } from '../gyms-repository';

export class InMemoryGymsRepository implements GymsRepository{
	public items: Gym[] = [];
	
	async findById(id: string): Promise<Gym | null> {
		const gym = this.items.find(items=>items.id === id);  

		if(!gym){
			return null;
		}

		return gym;
	}
}