import joi from "joi";

export const paymentSchema = joi.object({
	payment: joi.string().required().label("Payment"),
});