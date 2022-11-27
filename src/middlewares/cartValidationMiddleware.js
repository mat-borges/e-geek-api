import { cartSchema, itemSchema, itemPutSchema } from "../models/cartSchema.js";
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

export async function cartPutValidation(req, res, next) {
	const product = {
		itemId: cleanStringData(req.body.itemId),
		amount: req.body.amount,
	};

	const validation = itemPutSchema.validate(product, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(422).send(errors);
		return;
	} else {
		res.locals.product = product;
	}
	next();
}

export async function itemCartIdValidation(req, res, next) {
	const validation = itemSchema.validate(req.params.id, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(422).send(errors);
		return;
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
	const session = res.locals.session;
	let searchFor;

	try {
		if(session.userId===null){
			searchFor = {productId: ObjectId(productId), sessionId: session._id}
		}else{
			searchFor = {productId: ObjectId(productId), userId: session.userId}
		}
		const productExists = await cartsCollection.findOne(searchFor);
		
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


export async function checkCartItem(req, res, next) {
	let itemId = req.params?.id
	const { userId, _id} = res.locals.session
	let searchFor;

	if (itemId===undefined){
		itemId = res.locals.product.itemId
	}

	try {
		if(userId===null){
			searchFor = {_id: ObjectId(itemId), sessionId: _id}
		}else{
			searchFor = {_id: ObjectId(itemId), userId: userId}
		}
		const productExists = await cartsCollection.findOne(searchFor);

		if (!productExists) {
			res.status(401).send({ message: "Item não encontrado!" });
			return;
		}
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
	next();
}

