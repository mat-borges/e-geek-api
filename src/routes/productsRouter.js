import { getProductById, getProducts, getSearch } from '../controllers/productsController.js';

import { Router } from 'express';

const router = Router();

router.get('/products', getProducts);

router.get('/product/:id', getProductById);

router.get('/search', getSearch);

export default router;
