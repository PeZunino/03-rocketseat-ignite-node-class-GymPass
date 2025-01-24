import { User } from '@/entities/user';

export interface UsersRepository{
	create(data:User):Promise<User>

	findById(id:string):Promise<User | null>

	findByEmail(email:string):Promise<User | null>
}