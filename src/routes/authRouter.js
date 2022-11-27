import { checkUserExists, validateSignUpSchema } from '../middlewares/singUpValidationMiddleware.js';
import { signInValidation, checkUserAndPassword } from '../middlewares/signInValidationMiddleware.js';
import { Router } from 'express';
import { postSignUp, postSignIn, getNewSession } from '../controllers/authController.js';

const router = Router();

router.post('/sign-up', validateSignUpSchema, checkUserExists, postSignUp);
router.post('/sign-in', signInValidation, checkUserAndPassword, postSignIn);
router.get('/NewSession', getNewSession);

export default router;
