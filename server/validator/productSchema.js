import Joi from "joi";

export const productQuerySchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .allow('')
        .messages({
            'string.base': 'Search must be a text string',
            'string.min': 'Search term must be at least 2 characters long'
        }),
    description: Joi.string()
        .trim()
        .allow('')
        .messages({
            'string.base': 'Description must be a text string'
        }),
    category: Joi.string()
        .valid("Men", "Women", "Kids")
        .allow('')
        .messages({'any.only': 'Category must be Men, Women, or Kids'}),

    size: Joi.string()
        .valid('XS', 'S', 'M', 'L', 'XL', 'XXL')
        .allow('')
        .messages({
            'any.only': 'Size must be one of: XS, S, M, L, XL, XXL'
        }),

    minPrice: Joi.number()
        .min(0)
        .empty('')
        .messages({
            'number.base': 'Minimum price must be a number',
            'number.min': 'Minimum price cannot be less than 0'
        }),

    maxPrice: Joi.number()
        .min(Joi.ref('minPrice'))
        .empty('')
        .messages({
            'number.base': 'Maximum price must be a number',
            'number.min': 'Maximum price must be greater than or equal to Minimum price'
        }),

    page: Joi.number()
        .integer()
        .min(1)
        .default(1)
        .messages({
            'number.base': 'Page must be a number',
            'number.integer': 'Page must be a whole number',
            'number.min': 'Page number must be at least 1'
        }),

    limit: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .default(10)
        .messages({
            'number.base': 'Limit must be a number',
            'number.integer': 'Limit must be a whole number',
            'number.min': 'Limit must be at least 1',
            'number.max': 'Limit cannot exceed 100 products per page'
        })
});
