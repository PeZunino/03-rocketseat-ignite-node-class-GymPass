import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { authenticate } from './authenticate.controller';
import { profile } from './profile.controller';
import { refresh } from './refresh';
import { register } from './register.controller';


export async function usersRoutes(app:FastifyInstance){
	app.post('/users', register);

	app.post('/sessions', authenticate);

	app.patch('/token/refresh', refresh);

	app.get('/me',{
		onRequest: [
			verifyJWT
		]
	},profile);
  
}