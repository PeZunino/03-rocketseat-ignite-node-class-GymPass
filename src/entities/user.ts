import { CheckIn } from './check-in';

export interface User{
	id?: string
	name: string
	email: string
	password_hash: string
	created_at?: Date | string
	checkIns?: CheckIn[]
}