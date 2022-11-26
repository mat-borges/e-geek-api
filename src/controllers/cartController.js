import { cartsCollection, sessionsCollection } from "../db/db.js";
import { ObjectId } from "mongodb";

export async function postCartItem(req, res) {
	const product = res.locals.product;
	const session = res.locals.session;

	const cartItem = {
		...product,
        productId: ObjectId(product.productId),
		sessionId: session._id,
		userId: session.userId,
	};

	try {
		await cartsCollection.insertOne(cartItem);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}

	res.send({ message: "ok" });
}
