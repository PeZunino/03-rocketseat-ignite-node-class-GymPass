import { CheckIn } from '@/entities/check-in';

export interface CheckInsRepository{
	create(data:CheckIn):Promise<CheckIn>

	findByUserIdOnDate(userId:string, date:Date):Promise<CheckIn | null>

	findManyByUserId(userId:string,page:number):Promise<CheckIn[]>

	countByUserId(userId:string):Promise<number>
}