import joi from "joi";

export const cartSchema = joi.object({
	amount: joi.number().min(1).required().label("Amount"),
	productId: joi.string().length(24).hex().required().label("Product Id"),
});
