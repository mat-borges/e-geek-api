import {
	checkUrl,
	checkUserExists,
	validateSignUpSchema,
} from '../middlewares/singUpValidationMiddleware.js';
import { checkUserAndPassword, signInValidation } from '../middlewares/signInValidationMiddleware.js';
import { deleteSignOut, getNewSession, postSignIn, postSignUp } from '../controllers/authController.js';

import { Router } from 'express';
import { checkSession } from '../middlewares/sessionValidationMiddleware.js';

const router = Router();

router.post('/sign-up', checkUrl, validateSignUpSchema, checkUserExists, postSignUp);
router.post('/sign-in', signInValidation, checkUserAndPassword, postSignIn);
router.get('/NewSession', getNewSession);
router.delete('/sign-out', checkSession, deleteSignOut);

export default router;
