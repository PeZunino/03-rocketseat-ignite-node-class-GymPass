import { Environment } from 'vitest/environments';

export default <Environment> {
	name: 'prisma',
	async setup(){
		console.log('setup');
	
		return{teardown(){}};
	},
	transformMode: 'ssr',
};