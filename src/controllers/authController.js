import { usersCollection, sessionsCollection } from '../db/db.js';
import { v4 as uuid } from 'uuid';

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

export async function postSignIn(req, res){
	const { user } = res.locals;

	try{
		const token = uuid();
		const userData = await usersCollection.findOne({email: user.email});
		const sessionExists = await sessionsCollection.findOne({userId: userData._id});

		if(sessionExists){
			await sessionsCollection.updateOne({
				userId: userExists._id
			},{
				$set:{
					lastStatus: Date.now(),
					token
				}
			});

		}else{
			await sessionsCollection.insertOne({
				userId: userExists._id,
				lastStatus: Date.now(),
				token
			});

		}
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
