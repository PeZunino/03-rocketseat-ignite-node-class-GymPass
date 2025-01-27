import {beforeEach,describe,expect, it} from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsService } from './search-gyms.service';

let gymsRepository: InMemoryGymsRepository;

let sut: SearchGymsService;

describe('Search Gyms Use Case',()=>{

	beforeEach(async ()=>{
		gymsRepository = new InMemoryGymsRepository();

		sut = new SearchGymsService(gymsRepository);

	});

	it('should be able to search for gyms',async ()=>{

		await gymsRepository.create({
			title: 'JavaScript Gym',
			latitude:-27.2092052,
			longitude:-48.659741,
			description: null,
			phone:null
		});
    
		await gymsRepository.create({
			title: 'Typescript Gym',
			latitude:-27.2092052,
			longitude:-48.659741,
			description: null,
			phone:null
		});

		const {gyms} = await sut.execute({
			query: 'JavaScript',
			page:1
		});

		expect(gyms)
			.toHaveLength(1);

		expect(gyms)
			.toEqual([
				expect.objectContaining({title: 'JavaScript Gym'}),
			]);
	});

	it('should be able to fetch paginated gym search',async ()=>{

		for(let i = 1; i <= 22; i++){
			await gymsRepository.create({
				title: `JavaScript Gym ${i}`,
				latitude:-27.2092052,
				longitude:-48.659741,
				description: null,
				phone:null
			});
		}

		const {gyms} = await sut.execute({
			query: 'JavaScript',
			page:2
		});

		expect(gyms)
			.toHaveLength(2);

		expect(gyms)
			.toEqual([
				expect.objectContaining({title: 'JavaScript Gym 21'}),
				expect.objectContaining({title: 'JavaScript Gym 22'})
			]);
	});

});