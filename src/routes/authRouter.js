import { Router } from 'express';
import { postSignUp } from '../controllers/authController.js';
import { validateSignUp } from '../middlewares/singUpValidationMiddleware.js';

const router = Router();

router.post('/sign-up', validateSignUp, postSignUp);

export default router;
