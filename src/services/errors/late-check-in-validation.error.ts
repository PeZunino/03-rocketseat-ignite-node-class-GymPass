export class LateCheckInValidationError extends Error{
	constructor(){
		super('The check-in can only validates until 20 minutes of its creation');
	}
}