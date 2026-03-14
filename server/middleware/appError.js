export class AppError extends Error {
    constructor(message, statusCode, details = null) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.details = details;
        this.meta = {
            timestamp: new Date().toISOString(),
            apiVersion: '1.0.0',
        };
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(title = 'Not found', details = null) {
        super(title, 404, details);
    }
}

export class ValidationError extends AppError {
    constructor(title = 'Validation Failed', details = null) {
        super(title, 400, details);
    }
}

export class InternalServerError extends AppError {
    constructor(title = 'Internal server Failed', details = null) {
        super(title, 500, details);
    }
}

export class ConflictError extends AppError {
    constructor(title = 'Conflict Error', details = null) {
        super(title, 409, details);
    }
}

export class BadRequestError extends AppError {
    constructor(title = 'Bad request Error', details = null) {
        super(title, 400, details);
    }
}


export class DuplicateKeyError extends AppError {
    constructor(field, value) {
        super(`${field} '${value}' already exists`, 409);
        this.field = field;
        this.value = value;
    }
}

export class AuthenticationError extends AppError {
    constructor(title = 'Authentication error', details = null) {
        super(title, 401, details);
    }
}


export class AuthorizationError extends AppError {
    constructor(title = 'Authorization error', details = null) {
        super(title, 403, details);
    }
}


export class RangeError extends AppError {
    constructor(title = 'Range Not Satisfiable', details = null) {
        super(title, 416, details);
    }
}

export class EmailDeliveryError extends AppError {
    constructor(title = 'Failed to send email', details = null) {

        super(title, 502, details);
    }
}


