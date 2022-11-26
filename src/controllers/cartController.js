import { cartsCollection, sessionsCollection, productsCollection } from "../db/db.js";
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
		const productDataBase = await productsCollection.findOne(ObjectId(product.productId))

		await cartsCollection.insertOne({
			...cartItem,
			name: productDataBase.name,
			mainimage: productDataBase.mainimage,
			price: productDataBase.price
		});
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}

	res.send({ message: "ok" });
}

export async function getCartItens(req, res) {
	const session = res.locals.session;
	let searchFor = {}

	try {
		if(session.userId===null){
			searchFor = {sessionId: session._id}
		}else{
			searchFor = {userId: session.userId}
		}
		
		let cartList = await cartsCollection.find(searchFor).toArray();
		cartList.forEach(element=>{
			delete element.userId
			delete element.sessionId
		});
		
		res.send(cartList);

		
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
		return
	}
}

export async function deleteCartItem(req, res){
	const id = req.params.id
	
	try{
		await cartsCollection.deleteOne({_id: ObjectId(id)})
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
		return
	}
	res.send({ message: "ok" });
}

export async function putCartItem(req, res){
	const { itemId, amount } = res.locals.product
	
	try{
		await cartsCollection.updateOne({
			_id: ObjectId(itemId)
		},{
			$set: {
				amount: amount
			}
		})
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
		return
	}
	res.send({ message: "ok" });
}