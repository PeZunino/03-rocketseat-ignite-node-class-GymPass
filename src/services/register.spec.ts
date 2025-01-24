import { compare } from 'bcryptjs';
import {beforeEach,describe,expect, it} from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { RegisterService } from './register.service';

let usersRepository: InMemoryUsersRepository;

let sut: RegisterService;

describe('Register Use Case',()=>{

	beforeEach(()=>{
		usersRepository = new InMemoryUsersRepository();

		sut = new RegisterService(usersRepository);
	});

	it('should not be able to register with same email twice',async ()=>{

		const {user} = await sut.execute({
			email:'johndoe@example.com',
			name: 'John Doe',
			password: '123123123'
		});

		expect(user.id)
			.toEqual(expect.any(String));
	});
  
	it('should hash user password upon registration',async ()=>{
    
		const {user} = await sut.execute({
			email: 'johndoe@example.com',
			name: 'John Doe',
			password: '123123123'
		});

		const isPasswordCorrectlyHashed = await compare(
			'123123123', 
			user.password_hash
		);

		expect(isPasswordCorrectlyHashed)
			.toBe(true);
	});

	it('should not be able to register with same email twice',async ()=>{
    
		const email = 'johndoe@example.com';

		await sut.execute({
			email,
			name: 'John Doe',
			password: '123123123'
		});

		await expect( ()=>
			sut.execute({
				email,
				name: 'John Doe',
				password: '123123123'
			})
		).rejects.toBeInstanceOf(UserAlreadyExistsError);


	});
});