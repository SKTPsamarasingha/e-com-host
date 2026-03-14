import Joi from "joi";

export const shippingAddressSchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 2 characters",
  }),

  addressLine1: Joi.string().min(5).max(200).required().messages({
    "string.empty": "Address is required",
  }),

  city: Joi.string().min(2).max(100).required().messages({
    "string.empty": "City is required",
  }),

  postalCode: Joi.string().min(3).max(20).required().messages({
    "string.empty": "Postal code is required",
  }),

  country: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Country is required",
  }),
});

export const paymentSchema = Joi.object({
  method: Joi.string().valid("CARD", "CASH_ON_DELIVERY").required().messages({
    "any.only": "Invalid payment method",
    "string.empty": "Payment method is required",
  }),
});

export const checkoutSchema = Joi.object({
  shippingData: shippingAddressSchema.required(),
  payment: paymentSchema.required(),
});
