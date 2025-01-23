import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists.error';
import { RegisterService } from '@/services/register.service';

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
		const prismaUsersRepository = new PrismaUsersRepository();

		const registerService = new RegisterService(prismaUsersRepository);

		await registerService.execute({
			email,
			name,
			password
		});

	}catch(err){
		if(err instanceof UserAlreadyExistsError){
			return response.status(409)
				.send({message: err.message});
		}

		throw err;
	}

	return response.status(201)
		.send();
}