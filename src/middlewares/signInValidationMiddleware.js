import { signInSchema } from "../models/signInSchema.js";
import bcrypt from 'bcrypt';
import { cleanStringData } from "../index.js";

export async function signInValidation(req, res, next){
    const signInObject = req.body;
    const listKeysObject = Object.keys(signInObject);
    
    listKeysObject.forEach((key) => (signInObject[key] = cleanStringData(signInObject[key])))

    const validation = signInSchema.validate(signInObject,{abortEarly: false})

    if(validation.error){
        const errors = validation.error.details.map((detail)=>detail.message)
        res.status(422).send(errors)
        return;
    }else{
        const hashPassword = bcrypt.hashSync(signInObject.password,10);
        res.locals.user = {...signInObject, password: hashPassword};
    }
    next();
}
