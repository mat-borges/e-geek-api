import { cartsCollection } from "../db/db.js";

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