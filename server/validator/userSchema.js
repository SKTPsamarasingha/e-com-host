import Joi from "joi";

// Common message templates
const messages = {
    required: '{{#label}} is required',
    empty: '{{#label}} cannot be empty',
    invalid: 'Please provide a valid {{#label}}'
};

const id = Joi.string()
    .uuid()
    .required()
    .messages({
        'string.empty': messages.empty, 'string.guid': 'User ID must be a valid UUID', 'any.required': messages.required
    });

const email = Joi.string()
    .email()
    .lowercase()
    .trim()
    .max(255)
    .required()
    .messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': messages.empty,
        'string.max': 'Email cannot exceed 255 characters',
        'any.required': messages.required
    });

const password = Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password cannot exceed 128 characters',
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
        'string.empty': messages.empty,
        'any.required': messages.required
    });

const name = Joi.string()
    .pattern(/^[A-Za-z\s\-'.]+$/) // Allow letters, spaces, hyphens, apostrophes, periods
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
        'string.pattern.base': 'Name can only contain letters, spaces, hyphens, apostrophes, and periods',
        'string.min': 'Name must be at least 2 characters long',
        'string.max': 'Name cannot exceed 50 characters',
        'string.empty': messages.empty,
        'any.required': messages.required
    });

const role = Joi.string()
    .valid("admin", "user")
    .default("user")
    .required()
    .messages({
        'any.only': 'Role must be either "user" or "admin"', 'any.required': messages.required
    });



// Export schemas

export const userRegistrationSchema = Joi.object({
    name: name, email: email, password: password, role: role,
}).options({abortEarly: false});

export const userLoginSchema = Joi.object({
    email: email, password: password
}).options({abortEarly: false});

export const usersIDSchema = Joi.object({
    id: id
}).options({abortEarly: false});

export const userUpdateSchema = Joi.object({
    name: name.optional(), email: email.optional(), role: role.optional()
}).min(1)
    .options({abortEarly: false});

export const passwordResetSchema = Joi.object({
    email: email, newPassword: password
}).options({abortEarly: false});