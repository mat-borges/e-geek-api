import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
	await mongoClient.connect();
	console.log('MongoDB connected!');
} catch (err) {
	console.log('Erro no mongo.connect', err.message);
}

export const db = mongoClient.db('eGeek');

export const usersCollection = db.collection('users');
export const productsCollection = db.collection('products');
export const sessionsCollection = db.collection('sessions');
export const purchasesCollection = db.collection('purchases');
export const cartsCollection = db.collection('cart');
