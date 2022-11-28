import { purchasesCollection } from '../db/db.js';

export async function getPurchases(req, res) {
	const { userId } = res.locals.session;

	try {
		const purchases = await purchasesCollection.find({ userId }).toArray();
		res.send(purchases);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
