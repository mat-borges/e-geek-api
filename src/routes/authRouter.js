import {
	checkUrl,
	checkUserExists,
	validateSignUpSchema,
} from '../middlewares/singUpValidationMiddleware.js';
import { checkUserAndPassword, signInValidation } from '../middlewares/signInValidationMiddleware.js';
import { getNewSession, postSignIn, postSignUp } from '../controllers/authController.js';

import { Router } from 'express';

const router = Router();

router.post('/sign-up', checkUrl, validateSignUpSchema, checkUserExists, postSignUp);
router.post('/sign-in', signInValidation, checkUserAndPassword, postSignIn);
router.get('/NewSession', getNewSession);

export default router;
