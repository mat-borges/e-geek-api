import { signInSchema } from "../models/signInSchema.js";
import bcrypt from 'bcrypt';
import { cleanStringData } from "../index.js";
import { v4 as uuid } from 'uuid';
import { usersCollection, sessionsCollection } from '../db/db.js';

export async function signInValidation(req, res, next){
    const user = req.body;
    const listKeysObject = Object.keys(user);
    
    listKeysObject.forEach((key) => (user[key] = cleanStringData(user[key])))

    const validation = signInSchema.validate(user,{abortEarly: false})

    if(validation.error){
        const errors = validation.error.details.map((detail)=>detail.message)
        res.status(422).send(errors)
        return;
    }else{
        res.locals.user = user;
    }
    next();
}

export async function checkUserAndPassword(req, res, next){
    const { user } = res.locals

    try{
        const userExists = await usersCollection.findOne({email: user.email});

        if (!userExists && !bcrypt.compare(user.password, userExists.password)){
            res.status(401).send({message:'Usuário e/ou senha inválidos!'})
            return;
        }
    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}