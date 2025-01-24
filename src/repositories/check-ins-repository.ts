import { CheckIn } from '@/entities/checkin';

export interface CheckInsRepository{
	create(data:CheckIn):Promise<CheckIn>
}