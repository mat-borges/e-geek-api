import { Router } from "express";
import { postCartItem, getCartItens, deleteCartItem, putCartItem } from "../controllers/cartController.js";
import { cartValidation, checkProduct, checkProductAlreadyAdded, checkCartItem, itemCartIdValidation, cartPutValidation } from "../middlewares/cartValidationMiddleware.js";
import { checkSession } from "../middlewares/sessionValidationMiddleware.js";

const router = Router();

router.post("/cartItem", 
    cartValidation, 
    checkSession, 
    checkProduct, 
    checkProductAlreadyAdded, 
    postCartItem
    );

router.get("/cartItens", checkSession, getCartItens)

router.delete("/cartItem/:id", itemCartIdValidation, checkSession, checkCartItem, deleteCartItem)

router.put("/cartItem", cartPutValidation, checkSession, checkCartItem, putCartItem)

export default router;
