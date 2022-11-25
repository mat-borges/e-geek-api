import bcrypt from 'bcrypt';
import { cleanStringData } from '../index.js';
import dayjs from 'dayjs';
import ptbr from 'dayjs/locale/pt-br.js';
import { signUpSchema } from '../models/signUpSchema.js';
import { usersCollection } from '../db/db.js';

export async function validateSignUpSchema(req, res, next) {
	const { name, email, password, cpf, birthdate, adress } = req.body;

	dayjs.locale(ptbr);

	const formatCpf = cleanStringData(cpf)
		.replace(/\D/g, '')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})/, '$1-$2')
		.replace(/(-\d{2})\d+$/, '$1');

	const user = {
		name: cleanStringData(name),
		email: cleanStringData(email),
		password,
		cpf: formatCpf,
		birthdate: dayjs(cleanStringData(birthdate)).valueOf(),
		adress: cleanStringData(adress),
	};
	// Validate Schema
	const { error } = signUpSchema.validate(user, { abortEarly: false });

	if (error) {
		console.log(user);
		const errors = error.details.map((detail) => detail.message);
		return res.status(422).send({ message: errors });
	} else {
		const hashPassword = bcrypt.hashSync(user.password, 10);
		res.locals.user = { ...user, password: hashPassword };
		next();
	}
}

export async function checkUserExists(req, res, next) {
	const { email } = res.locals.user;

	try {
		const userExists = await usersCollection.findOne({ email });

		if (userExists) {
			return res.status(401).send({ message: 'There is a user registered with this email already' });
		} else {
			next();
		}
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
