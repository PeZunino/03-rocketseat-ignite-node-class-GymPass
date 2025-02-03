import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { CheckInService } from '../check-in.service';

export function makeCheckInService(){

	const prismaCheckInsRepository = new PrismaCheckInsRepository();

	const prismaGymsRepository = new PrismaGymsRepository();

	const checkInService = new CheckInService(prismaCheckInsRepository, prismaGymsRepository);

	return checkInService;
}