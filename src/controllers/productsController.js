import { productsCollection } from '../db/db.js';

export async function getProducts(req, res, next) {
	let limit = parseInt(req.query.limit);
	let page = parseInt(req.query.page);

	const products = await productsCollection.find().toArray();

	if (!page) page = 1;

	if (!limit) limit = 20;

	const start = (page, limit) => (page - 1) * limit;
	const end = (page, limit) => page * limit;

	const sendProducts = products.slice(start(page, limit), end(page, limit));
	res.send(sendProducts);
}
