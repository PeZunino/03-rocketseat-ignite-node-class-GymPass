import {beforeEach,describe,expect, it} from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymService } from './create-gym.service';

let gymsRepository: InMemoryGymsRepository;

let sut: CreateGymService;

describe('Register Use Case',()=>{

	beforeEach(()=>{
		gymsRepository = new InMemoryGymsRepository();

		sut = new CreateGymService(gymsRepository);
	});

	it('should be able to create a gym',async ()=>{

		const {gym} = await sut.execute({
			title: 'Javascript Gym',
			latitude:-27.2092052,
			longitude:-48.659741,
			description: null,
			phone:null
		});

		expect(gym.id)
			.toEqual(expect.any(String));
	});
  
});