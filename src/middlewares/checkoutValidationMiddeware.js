import { cartsCollection } from "../db/db.js";
import { paymentSchema } from "../models/paymentSchema.js";
import { cleanStringData } from "../index.js";

export async function userLogged(req, res, next){
    const { userId } = res.locals.session;

    if(userId===null){
        res.status(401).send({message: 'Não ha um usuario logado!'})
        return;
    }
    next()
}

export async function emptyCart(req, res, next){
    const { userId } = res.locals.session;

    try{
        const cart = await cartsCollection.find({userId: userId}).toArray()

        if(cart.length === 0){
            res.status(401).send({message: 'Não ha produtos no carrinho!'});
            return;
        }
    } catch (err){
        console.log(err);
        res.sendStatus(500)
    }
    next()
}

export async function paymentValidation(req, res, next) {
	const paymentMethod = {
        payment: cleanStringData(req.body.payment)
    }

	const validation = paymentSchema.validate(paymentMethod, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		res.status(422).send(errors);
		return;
	} else {
		res.locals.payment = paymentMethod;
	}
	next();
}