import { usersCollection } from '../db/db.js';

export async function postSignUp(req, res) {
	const { user } = res.locals;

	try {
		await usersCollection.insertOne(user);
		res.status(200).send({ message: 'User registered successfully' });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
