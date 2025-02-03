import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { FetchUserCheckInsHistory } from '../fetch-user-check-ins-history.service';

export function makeFetchUserCheckInsHistoryService(){
	const prismaCheckInsRepository = new PrismaCheckInsRepository();
  
	const fetchUserCheckInsHistoryService = new FetchUserCheckInsHistory(prismaCheckInsRepository);

	return fetchUserCheckInsHistoryService;
}