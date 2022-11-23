import Joi from 'joi';
import { Router } from 'express';
import { productsCollection } from '../db/db.js';

const router = Router();

const productSchema = Joi.object({
	name: Joi.string().required().label('Name'),
	price: Joi.number().positive().precision(2).required().label('Price'),
	tags: Joi.array().items(Joi.string().required()).label('tags'),
	mainimage: Joi.string().uri().required().label('MainImage'),
	images: Joi.array().items(Joi.string().uri()).label('Images'),
	description: Joi.string().required().label('Description'),
	sizes: Joi.array().items(Joi.string().min(1).valid('PP', 'P', 'M', 'G', 'GG', 'N/A')).label('Sizes'),
	purchases: Joi.number().integer().required().label('Purchases'),
});

router.post('/editProduct', async (req, res) => {
	const productData = req.body;
	const { error, value: product } = productSchema.validate(productData, { abortEarly: false });
	if (error) {
		const errors = error.details.map((detail) => detail.message);
		return res.status(422).send({ message: errors });
	}
	try {
		await productsCollection.insertOne(product);
		res.status(200).send(product);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

router.put('/editProduct', (req, res) => {
	res.status(404).send('Not implemented yet');
});

router.delete('/editProduct', (req, res) => {
	res.status(404).send('Not implemented yet');
});

export default router;
