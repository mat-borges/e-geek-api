import joi from "joi";

export const cartSchema = joi.object({
	amount: joi.number().min(1).required().label("Amount"),
	productId: joi.string().length(24).hex().required().label("Product Id"),
});

export const itemSchema = joi.string().length(24).hex().required().label("Item cart Id");

export const itemPutSchema = joi.object({
	amount: joi.number().min(1).required().label("Amount"),
	itemId: joi.string().length(24).hex().required().label("Item cart Id"),
});