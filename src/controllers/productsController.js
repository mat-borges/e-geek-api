import { ObjectId } from 'mongodb';
import { productsCollection } from '../db/db.js';

export async function getProducts(req, res) {
	let limit = parseInt(req.query.limit);
	let page = parseInt(req.query.page);

	try {
		const products = await productsCollection.find().toArray();

		if (!page) page = 1;

		if (!limit) limit = 20;

		const start = (page, limit) => (page - 1) * limit;
		const end = (page, limit) => page * limit;

		const sendProducts = products.slice(start(page, limit), end(page, limit));
		res.send(sendProducts);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function getProductById(req, res) {
	const { id } = req.params;
	const findId = new ObjectId(id);

	try {
		const product = await productsCollection.findOne({ _id: new ObjectId(id) });
		res.send(product);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}
