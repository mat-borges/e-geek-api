import { cleanStringData } from '../index.js';
import { signUpSchema } from '../models/signUpSchema.js';
import { usersCollection } from '../db/db.js';

export async function validateSignUp(req, res, next) {
	const { name, email, password, cpf, birthdate, adress } = req.body;
	const user = {
		name: cleanStringData(name),
		email: cleanStringData(email),
		password,
		cpf: cleanStringData(cpf),
		birthdate: cleanStringData(birthdate),
		adress: cleanStringData(adress),
	};

	const { error } = signUpSchema.validate(user, { abortEarly: false });

	if (error) {
		const errors = error.details.map((detail) => detail.message);
		return res.status(422).send({ message: errors });
	}

	try {
		const userExists = await usersCollection.findOne({ email: user.email });

		if (userExists) {
			return res.status(401).send({ message: 'There is a user registered with this email already' });
		} else {
			res.locals.user = user;
			next();
		}
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
