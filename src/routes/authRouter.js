import { checkUserExists, validateSignUpSchema } from '../middlewares/singUpValidationMiddleware.js';

import { Router } from 'express';
import { postSignUp } from '../controllers/authController.js';

const router = Router();

router.post('/sign-up', validateSignUpSchema, checkUserExists, postSignUp);

export default router;
