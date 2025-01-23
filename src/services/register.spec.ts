import { compare } from 'bcryptjs';
import {describe,expect, it} from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { RegisterService } from './register.service';

describe('Register Use Case',()=>{
	it('should not be able to register with same email twice',async ()=>{
		const usersRepository = new InMemoryUsersRepository();
    
		const registerUseCase = new RegisterService(usersRepository);

		const {user} = await registerUseCase.execute({
			email:'johndoe@example.com',
			name: 'John Doe',
			password: '123123123'
		});

		expect(user.id)
			.toEqual(expect.any(String));
	});
  
	it('should hash user password upon registration',async ()=>{
		const usersRepository = new InMemoryUsersRepository();
    
		const registerUseCase = new RegisterService(usersRepository);

		const {user} = await registerUseCase.execute({
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
		const usersRepository = new InMemoryUsersRepository();
    
		const registerUseCase = new RegisterService(usersRepository);

		const email = 'johndoe@example.com';

		await registerUseCase.execute({
			email,
			name: 'John Doe',
			password: '123123123'
		});

		await expect( ()=>
			registerUseCase.execute({
				email,
				name: 'John Doe',
				password: '123123123'
			})
		).rejects.toBeInstanceOf(UserAlreadyExistsError);


	});
});