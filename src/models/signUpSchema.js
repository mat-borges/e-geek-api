import Joi from 'joi';

export const signUpSchema = Joi.object({
	name: Joi.string().min(3).required().label('Name'),
	email: Joi.string().email().required().label('E-mail'),
	password: Joi.string().min(8).required().label('Password'),
	cpf: Joi.string()
		.pattern(/[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}/, 'CPF')
		.label('CPF'),
	birthdate: Joi.date().timestamp('javascript').required().label('Birth Date'),
	adress: Joi.string().min(5).required().label('Adress'),
});
