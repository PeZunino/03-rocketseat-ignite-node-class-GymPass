import { randomUUID } from 'node:crypto';
import { CheckIn, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { CheckInsRepository } from '../check-ins-repository';

export class InMemoryCheckInsRepository implements CheckInsRepository{
	
	public items: CheckIn[] = [];

	async findByUserIdOnDate(userId: string, date: Date) {
		const startOfTheDay = dayjs(date)
			.startOf('date');

		const endOfTheDay = dayjs(date)
			.endOf('date');

		const checkInOnSameDate = this.items.find((checkIn)=>{
			const checkInDate = dayjs(checkIn.created_at);

			const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
			
			return checkIn.user_id === userId && isOnSameDate;
		});
		
		if(!checkInOnSameDate){
			return null;
		}

		return checkInOnSameDate;
	}
  
	async findManyByUserId(userId: string, page: number) {
		return this.items.filter(item=>item.user_id = userId)
			.slice((page - 1) * 20,page * 20);
	}
	
	async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
		const checkIn:CheckIn = {
			id: randomUUID(),
			gym_id: data.gym_id,
			user_id: data.user_id,
			created_at: new Date(),
			validated_at: data.validated_at ? new Date(data.validated_at) : null
		};

		this.items.push(checkIn);

		return checkIn;
	}

	async countByUserId(userId: string) {
		return this.items.filter(item=>item.user_id == userId).length;
	}

	async findById(id: string){
		return this.items.find(item=>item.id == id) ?? null;
	}

	async save(checkIn: CheckIn): Promise<CheckIn> {
		const checkInIndex = this.items.findIndex(item=>item.id === checkIn.id);

		if(checkInIndex >= 0){
			this.items[checkInIndex] = checkIn;
		} 

		return checkIn;
	}
}