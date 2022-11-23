import { db, sessionsCollection } from './db/db.js';
import express, { json } from 'express';

import authRouter from './routes/authRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
import manageProductRouter from './routes/manageProductsCollectionRouter.js';
import { stripHtml } from 'string-strip-html';

dotenv.config();

const app = express();
export const cleanStringData = (string) => stripHtml(string).result.trim();

app.use(cors());
app.use(json());

app.use(manageProductRouter);
app.use(authRouter);

app.listen(process.env.PORT, () => console.log(`Running server on http://localhost:${process.env.PORT}`));
