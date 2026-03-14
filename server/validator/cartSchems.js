import Joi from "joi";

export const cartItemSchema = Joi.object({
    product: Joi.string().trim().uuid().required()
        .messages({
            'string.empty': 'productID is required',
            'string.guid': 'productID must be a valid UUID',
            'any.required': 'productID is required'
        }),

    size: Joi.string()
        .valid('XS', 'S', 'M', 'L', 'XL', 'XXL')
        .required()
        .messages({
            'any.only': 'Size must be one of XS, S, M, L, XL, XXL', 'any.required': 'Size is required',
        }),

    quantity: Joi.number()
        .integer()
        .min(1)
        .default(1)
        .messages({
            'number.base': 'Quantity must be a number',
            'number.min': 'Quantity must be at least 1',
            'number.integer': 'Quantity must be an integer',
        }),
});

export const cartSchema = Joi.object({
    items: Joi.array()
        .items(cartItemSchema)
        .min(1)
        .required()
        .messages({
            'array.base': 'Items must be an array',
            'array.min': 'Cart must have at least one item',
            'any.required': 'Cart items are required',
        }),
});


export const itemID = Joi.object({
    itemID: Joi.string().trim().uuid().required()
        .messages({
            'string.empty': 'itemID is required',
            'string.guid': 'itemID must be a valid UUID',
            'any.required': 'itemID is required'
        })
})

export const updateCartItemSchema = Joi.object({
    quantity: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": "Quantity must be a number",
            "number.integer": "Quantity must be an integer",
            "number.min": "Quantity must be at least 1",
            "any.required": "Quantity is required"
        })
});
