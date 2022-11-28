import { usersCollection, sessionsCollection, cartsCollection } from "../db/db.js";
import { v4 as uuid } from "uuid";

export async function postSignUp(req, res) {
	const { user } = res.locals;

	try {
		await usersCollection.insertOne(user);
		res.status(200).send({ message: "User registered successfully" });
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function postSignIn(req, res) {
	const { user } = res.locals;
	let oldToken = user?.oldToken
	if (oldToken !== undefined){
		oldToken = oldToken.replace('Bearer ','')
	}

	try {
		const token = uuid();
		const userData = await usersCollection.findOne({ email: user.email });
		const sessionExists = await sessionsCollection.findOne({
			userId: userData._id,
		});
		const body = {
			token: token,
			name: userData.name,
			isLogged: true
		};

		if (sessionExists) {
			await sessionsCollection.updateOne(
				{userId: userData._id,},
				{$set: {
						lastStatus: Date.now(),
						token,
					},
				}
			);
		} else {
			await sessionsCollection.insertOne({
				userId: userData._id,
				lastStatus: Date.now(),
				token,
			});
		}

		res.send(body);
		
		if(oldToken !== undefined && oldToken !== null){
			const session = await sessionsCollection.findOne({token: oldToken})
			
			if(session){
				const oldCartList = await cartsCollection.find({sessionId: session._id}).toArray()
				const cartList = await cartsCollection.find({userId: userData._id}).toArray()
				const temporaryList = [...oldCartList,...cartList]
				const insertList = []
				let cursor
				
				for (let i=0; i<temporaryList.length; i++){
					cursor = 1
					for (let ii=0; ii<insertList.length; ii++){
						const equalProductId = temporaryList[i].productId.equals(insertList[ii].productId)
						const biggerAmount = temporaryList[i].amount >= insertList[ii].amount
						

						if ( equalProductId && biggerAmount){
							insertList[ii] = {
								...insertList[ii],
								amount: temporaryList[i].amount
							}
							cursor = 0
							break
						}else if (equalProductId){
							cursor = 0
							break
						}
					} 
					if(cursor){
						insertList.push({
							...temporaryList[i],
							userId: userData._id,
							sessionId: session._id
						})
					}
				}
				await sessionsCollection.deleteOne({token: oldToken})
				await cartsCollection.deleteMany({sessionId: session._id})
				await cartsCollection.deleteMany({userId: userData._id})
				await cartsCollection.insertMany(insertList)
			}
		}


	} catch (err) {
		console.log(err);
		res.sendStatus(500);
		return;
	}
}

export async function getNewSession(req, res) {
	const token = uuid();

	try {
		await sessionsCollection.insertOne({
			userId: null,
			token,
			lastStatus: Date.now(),
		});
		const body = {
			isLogged: false,
			token,
		};
		res.send(body);
	} catch (err) {
		console.log(err);
		res.send(500);
	}
}
