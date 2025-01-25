import { CheckIn } from './check-in';

export interface Gym{
	id?: string
	title: string
	description?: string | null
	phone?: string | null
	latitude: number  
	longitude: number
	checkIns?: CheckIn
}