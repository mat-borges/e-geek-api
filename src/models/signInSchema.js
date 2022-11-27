import joi from "joi";

export const signInSchema = joi.object({
	oldToken: joi.string(),
	isLogged: joi.boolean(),
	email: joi.string().email().required().label("E-mail"),
	password: joi
		.string()
		.min(8)
		.pattern(/^([a-zA-Z0-9@*#!.,$%]{8,})$/)
		.required()
		.label("Password"),
});
