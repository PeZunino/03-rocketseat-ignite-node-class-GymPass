import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { CreateGymService } from '../create-gym.service';

export function makeRegisterService(){
	const prismaUsersRepository = new PrismaGymsRepository();
  
	const createGymService = new CreateGymService(prismaUsersRepository);
  
	return createGymService;
}