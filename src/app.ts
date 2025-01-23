import { env } from 'env';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { appRoutes } from './http/routes';

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((err, _, response)=>{
	if(err instanceof ZodError){
		return response.status(400)
			.send({
				message: 'Validation error',
				issues: err.format()
			});
	}
  
	if(env.NODE_ENV != 'prod'){
		console.error(err);
	}

	return response.status(500)
		.send({message: 'Internal server error'});
});