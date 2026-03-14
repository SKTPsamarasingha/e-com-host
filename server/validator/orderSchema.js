import Joi from "joi";


export const shippingAddressSchema = Joi.object({
    fullName: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.base": "Full name must be a text string",
            "string.empty": "Full name is required",
            "string.min": "Full name must be at least 2 characters long",
            "string.max": "Full name cannot exceed 100 characters",
            "any.required": "Full name is required"
        }),

    addressLine1: Joi.string()
        .min(5)
        .max(200)
        .required()
        .messages({
            "string.base": "Address must be a text string",
            "string.empty": "Address is required",
            "string.min": "Address must be at least 5 characters long",
            "string.max": "Address cannot exceed 200 characters",
            "any.required": "Address is required"
        }),

    city: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.base": "City must be a text string",
            "string.empty": "City is required",
            "string.min": "City must be at least 2 characters long",
            "string.max": "City cannot exceed 100 characters",
            "any.required": "City is required"
        }),

    postalCode: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({
            "string.base": "Postal code must be a text string",
            "string.empty": "Postal code is required",
            "string.min": "Postal code must be at least 3 characters long",
            "string.max": "Postal code cannot exceed 20 characters",
            "any.required": "Postal code is required"
        }),

    country: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.base": "Country must be a text string",
            "string.empty": "Country is required",
            "string.min": "Country must be at least 2 characters long",
            "string.max": "Country cannot exceed 100 characters",
            "any.required": "Country is required"
        })
});


export const paymentSchema = Joi.object({
    method: Joi.string()
        .valid("CARD", "CASH_ON_DELIVERY")
        .required()
        .messages({
            "string.base": "Payment method must be a text string",
            "any.only": "Payment method must be either 'CARD' or 'CASH_ON_DELIVERY'",
            "string.empty": "Payment method is required",
            "any.required": "Payment method is required"
        })
});
export const checkoutSchema = Joi.object({
    shippingData: shippingAddressSchema.required(),
    payment: paymentSchema.required(),
});