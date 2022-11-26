import { cartSchema } from "../models/cartSchema.js";
import { productsCollection, cartsCollection } from "../db/db.js";
import { cleanStringData } from "../index.js";
import { ObjectId } from "mongodb";

export async function cartValidation(req, res, next) {
	const product = {
		productId: cleanStringData(req.body.productId),
		amount: req.body.amount,
	};

	const validation = cartSchema.validate(product, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(422).send(errors);
		return;
	} else {
		res.locals.product = product;
	}
	next();
}

export async function checkProduct(req, res, next) {
	const { productId } = res.locals.product;

	try {
		const productExists = await productsCollection.findOne({
			_id: ObjectId(productId),
		});

		if (!productExists) {
			res.status(401).send({ message: "Produto não encontrado!" });
			return;
		}
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
	next();
}

export async function checkProductAlreadyAdded(req, res, next) {
	const { productId } = res.locals.product;
	const {_id} = res.locals.session;

	try {
		const productExists = await cartsCollection.findOne({
			productId: ObjectId(productId),
			sessionId: _id
		});

		if (productExists) {
			res.status(401).send({ message: "Produto ja adicionado ao carrinho!" });
			return;
		}
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
	next();
}
