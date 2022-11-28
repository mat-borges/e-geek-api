import { cartsCollection, usersCollection, purchasesCollection, productsCollection } from "../db/db.js";
import { ObjectId } from "mongodb";

export async function sale(req, res){
    const { userId } = res.locals.session;
    const paymentMethod = res.locals.payment;

    try{
        let total = 0;
        const cart = await cartsCollection.find({userId: userId}).toArray();
        cart.forEach(element=>{
            delete element._id;
            delete element.userId;
            delete element.sessionId;
        });

        const user = await usersCollection.findOne({_id: userId});
        delete user._id;
        delete user.password;
        delete user.birthdate;

        for(let i=0; i < cart.length; i++){
            total += cart[i].amount * cart[i].price;
        }

        const purchase = {
            ...paymentMethod,
            ...user,
            total: total,
            userId: userId,
            purchasedate: Date.now(),
            products: cart
        };
        
        await purchasesCollection.insertOne(purchase);
        await cartsCollection.deleteMany({userId: userId});
        res.send({message:'ok'});

        for (let i = 0; i< cart.length; i++){
            const product = await productsCollection.findOne({_id: cart[i].productId});
            const purshaseAmount = product.purchases + cart[i].amount;
            await productsCollection.updateOne({_id: cart[i].productId},{$set:{purchases: purshaseAmount}});
        }

    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}