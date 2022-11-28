import { Router } from 'express';
import { checkSession } from '../middlewares/sessionValidationMiddleware.js';
import { getPurchases } from '../controllers/purchasesController.js';

const router = Router();

router.use(checkSession);

router.get('/purchases', getPurchases);

export default router;
