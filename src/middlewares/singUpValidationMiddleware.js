import bcrypt from 'bcrypt';
import { cleanStringData } from '../index.js';
import dayjs from 'dayjs';
import ptbr from 'dayjs/locale/pt-br.js';
import { signUpSchema } from '../models/signUpSchema.js';
import { usersCollection } from '../db/db.js';

export function checkUrl(req, res, next) {
	const image = cleanStringData(req.body?.image);
	console.log(image);
	const urlPattern = new RegExp(
		'^(https?:\\/\\/)?' + // validate protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	);
	const checkUrl = urlPattern.test(image);

	if (image.length !== 0 && !checkUrl) {
		return res.status(422).send({ errors: [{ label: 'Image', message: 'Invalid URL!' }] });
	} else if (image.length !== 0 && checkUrl) {
		res.locals.user = { ...req.body, image };
		return next();
	} else {
		res.locals.user = { ...req.body, image: '' };
		return next();
	}
}

export async function validateSignUpSchema(req, res, next) {
	const { name, email, image, password, cpf, birthdate, address } = res.locals.user;
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
		image: cleanStringData(image),
		cpf: formatCpf,
		birthdate: dayjs(cleanStringData(birthdate)).valueOf(),
		address: cleanStringData(address),
	};
	// Validate Schema
	const { error } = signUpSchema.validate(user, { abortEarly: false });

	if (error) {
		const errors = error.details.map(
			(detail) => new Object({ label: detail.context.label, message: detail.message })
		);
		return res.status(422).send({ errors });
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
