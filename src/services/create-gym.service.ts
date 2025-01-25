import { hash } from 'bcryptjs';
import { User } from '@/entities/user';
import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';

interface CreateGymServiceRequest{
	name:string,
	email:string, 
	password:string
}

interface CreateGymServiceResponse{
	user: User
}

export class CreateGymService{
  
	constructor(private usersRepository: UsersRepository){}

	async execute({
		email,name,password
	}:CreateGymServiceRequest):Promise<CreateGymServiceResponse>{
		const password_hash = await hash(password,6);
  
		const userWithSameEmail = await this.usersRepository.findByEmail(email);
 
		if(userWithSameEmail){
			throw new UserAlreadyExistsError();
		}
    
		const user = await this.usersRepository.create({
			name,
			email,
			password_hash
		});

		return {user};
	}
}

