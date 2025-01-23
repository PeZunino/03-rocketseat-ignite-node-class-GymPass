import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { registerService } from '@/services/register.service';

export async function register (request:FastifyRequest,response:FastifyReply){
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string()
			.email(),
		password: z.string()
			.min(6)
	});

	const {
		name,email,password
	} = registerBodySchema.parse(request.body);

	try{
		registerService({
			email,
			name,
			password
		});
	}catch{
		return response.status(409)
			.send();
	}

	return response.status(201)
		.send();
}