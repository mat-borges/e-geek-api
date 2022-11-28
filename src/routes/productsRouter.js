import { getProductById, getProducts } from '../controllers/productsController.js';

import { Router } from 'express';

const router = Router();

router.get('/products', getProducts);

router.get('/product/:id', getProductById);

export default router;
