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
	if (id.length !== 24) {
		return res.sendStatus(404);
	}
	try {
		const product = await productsCollection.findOne({ _id: new ObjectId(id) });
		res.send(product);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

export async function getSearch(req, res) {
	const filters = req.query;
	const tags = filters?.tags?.split(/-|,/);
	const sizes = filters?.sizes?.split(/-|,/);
	let limit = parseInt(filters?.limit);
	let page = parseInt(filters?.page);

	if (!tags && !sizes) {
		return res.sendStatus(404);
	}

	try {
		const products = await productsCollection.find({ tags: { $all: tags } }).toArray();

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
