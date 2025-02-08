import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreateGymService } from '@/services/factories/make-create-gym-service';

export async function create (request:FastifyRequest,response:FastifyReply){
	const createGymBodySchema = z.object({
		title: z.string(),
		description: z.string()
			.nullable(),
		phone: z.string()
			.nullable(),
		latitude: z.number()
			.refine(value=>{
				return Math.abs(value) <= 90;
			}),
		longitude: z.number()
			.refine(value=>{
				return Math.abs(value) <= 180;
			})
	});

	const {
		description,latitude,longitude,phone,title
	} = createGymBodySchema.parse(request.body);


	const registerService = makeCreateGymService();

	await registerService.execute({
		description,
		latitude,
		longitude,
		phone,
		title

	});

	return response.status(201)
		.send();
}