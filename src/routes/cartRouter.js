import {
	cartPutValidation,
	cartValidation,
	checkCartItem,
	checkProduct,
	checkProductAlreadyAdded,
	itemCartIdValidation,
} from '../middlewares/cartValidationMiddleware.js';
import { deleteCartItem, getCartItens, postCartItem, putCartItem } from '../controllers/cartController.js';

import { Router } from 'express';
import { checkSession } from '../middlewares/sessionValidationMiddleware.js';

const router = Router();

router.use(checkSession);

router.post('/cartItem', cartValidation, checkProduct, checkProductAlreadyAdded, postCartItem);

router.get('/cartItens', getCartItens);

router.delete('/cartItem/:id', itemCartIdValidation, checkCartItem, deleteCartItem);

router.put('/cartItem', cartPutValidation, checkCartItem, putCartItem);

export default router;
