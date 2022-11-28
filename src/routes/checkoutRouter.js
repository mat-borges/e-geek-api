import { Router } from "express";
import { sale } from "../controllers/checkoutController.js";
import { checkSession } from "../middlewares/sessionValidationMiddleware.js";
import { userLogged, emptyCart, paymentValidation } from "../middlewares/checkoutValidationMiddeware.js";

const router = Router();

router.post("/sale", checkSession, userLogged, emptyCart, paymentValidation, sale);

export default router;
