import Joi from 'joi';

export const signUpSchema = Joi.object({
	name: Joi.string().min(3).label('Name').required(),
	email: Joi.string().email().label('E-mail').required(),
	image: Joi.string().min(0),
	password: Joi.string()
		.min(8)
		.pattern(/^([a-zA-Z0-9@*#!.,$%]{8,})$/)
		.label('Password')
		.required(),
	cpf: Joi.string()
		.min(11)
		.max(14)
		.pattern(/[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}/, 'CPF')
		.label('CPF')
		.required(),
	birthdate: Joi.date().timestamp('javascript').label('Birth Date').required(),
	address: Joi.string().min(5).label('Address').required(),
});
