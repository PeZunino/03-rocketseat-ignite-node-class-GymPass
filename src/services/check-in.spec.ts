import {afterEach,beforeEach,describe,expect, it, vi} from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CheckInService } from './check-in.service';
import { MaxDistanceError } from './errors/max-distance.error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins.error';

let checkInsRepository: InMemoryCheckInsRepository;

let gymsRepository: InMemoryGymsRepository;

let sut: CheckInService;

describe('Register Use Case',()=>{

	beforeEach(async ()=>{
		checkInsRepository = new InMemoryCheckInsRepository();

		gymsRepository = new InMemoryGymsRepository();

		sut = new CheckInService(checkInsRepository,gymsRepository);

		await gymsRepository.create({
			id:'gym-01',
			title: 'Javascript Gym',
			description: '',
			phone: '',
			latitude:-26.8707298,
			longitude:-48.659741,
		
		});

		vi.useFakeTimers();
	});

	afterEach(()=>{
		vi.useRealTimers();
	});

	it('should be able to check in',async ()=>{
	
		const {checkIn} = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude:-26.8707298,
			userLongitude:-48.659741
		});

		expect(checkIn.id)
			.toEqual(expect.any(String));
	});

	it('should be able to check in twice in the same day',async ()=>{
		vi.setSystemTime(new Date(2022,0,20,8,0,0));

		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude:-26.8707298,
			userLongitude:-48.659741
		});


		await expect(()=>
			sut.execute({
				gymId: 'gym-01',
				userId: 'user-01',
				userLatitude:-26.8707298,
				userLongitude:-48.659741
			})
		).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
	});

	it('should be able to check in twice but in different days',async ()=>{
		vi.setSystemTime(new Date(2022,0,20,8,0,0));

		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude:-26.8707298,
			userLongitude:-48.659741
		});

		vi.setSystemTime(new Date(2022,0,21,8,0,0));

		const {checkIn} = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude:-26.8707298,
			userLongitude:-48.659741
		});

		expect(checkIn.id)
			.toEqual(expect.any(String));
	});

	it('should not be able to check in on distant gym',async ()=>{
		
		gymsRepository.items.push({
			id:'gym-01',
			title: 'Javascript Gym',
			description: '',
			phone: '',
			latitude:-26.8425214,
			longitude:-48.6350041,
		});

		await expect(()=>
			sut.execute({
				gymId: 'gym-01',
				userId: 'user-01',
				userLatitude:-27.2092052,
				userLongitude:-48.659741
			})
		).rejects.toBeInstanceOf(MaxDistanceError);
			
	});
});