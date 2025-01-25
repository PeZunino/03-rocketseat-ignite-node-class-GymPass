import { CheckIn } from '@/entities/check';

export interface CheckInsRepository{
	create(data:CheckIn):Promise<CheckIn>

	findByUserIdOnDate(userId:string, date:Date):Promise<CheckIn | null>
}