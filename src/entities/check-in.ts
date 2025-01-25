export interface CheckIn{
	id?: string,
	created_at?: Date | string,
	validated_at?: Date | string | null,
	user_id: string,
	gym_id: string
}