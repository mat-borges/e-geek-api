import { db, sessionsCollection } from './db/db.js';
import express, { json } from 'express';

import authRouter from './routes/authRouter.js';
import cartRouter from './routes/cartRouter.js';
import checkoutRouter from './routes/checkoutRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
import manageProductRouter from './routes/manageProductsCollectionRouter.js';
import productsRouter from './routes/productsRouter.js';
import purchasesRouter from './routes/purchasesRouter.js';
import { stripHtml } from 'string-strip-html';

dotenv.config();

const app = express();
export const cleanStringData = (string) =>
	stripHtml(JSON.stringify(string)?.replace(/"|"/gi, '')).result.trim();

app.use(cors());
app.use(json());

app.use(manageProductRouter);
app.use(authRouter);
app.use(productsRouter);
app.use(cartRouter);
app.use(checkoutRouter);
app.use(purchasesRouter);

app.listen(process.env.PORT, () => console.log(`Running server on http://localhost:${process.env.PORT}`));
