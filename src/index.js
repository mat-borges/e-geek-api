import { db, sessionsCollection } from './db/db.js';
import express, { json } from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import manageProductRouter from './routes/manageProductsCollection.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(manageProductRouter);

app.listen(process.env.PORT, () => console.log(`Running server on http://localhost:${process.env.PORT}`));
