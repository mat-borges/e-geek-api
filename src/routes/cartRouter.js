import { Router } from "express";
import { postCartItem } from "../controllers/cartController.js";
import { cartValidation, checkProduct, checkProductAlreadyAdded } from "../middlewares/cartValidationMiddleware.js";
import { checkSession } from "../middlewares/sessionValidationMiddleware.js";

const router = Router();

router.post("/cartItem", 
    cartValidation, 
    checkSession, 
    checkProduct, 
    checkProductAlreadyAdded, 
    postCartItem
    );

export default router;
