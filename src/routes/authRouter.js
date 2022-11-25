import { checkUserExists, validateSignUpSchema } from '../middlewares/singUpValidationMiddleware.js';
import { signInValidation, checkUserAndPassword } from '../middlewares/signInValidationMiddleware.js';
import { Router } from 'express';
import { postSignUp, postSignIn } from '../controllers/authController.js';

const router = Router();

router.post('/sign-up', validateSignUpSchema, checkUserExists, postSignUp);
router.post('/sign-in', signInValidation, checkUserAndPassword, postSignIn);

export default router;
