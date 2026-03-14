class CustomResponse {
    constructor(success, statusCode, message, data = null, meta = {}) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.meta = {
            timestamp: new Date().toISOString(), ...meta
        };
    }

    static success(message = "Operation completed successfully", data = null, meta = {}) {
        return new CustomResponse(true, 200, message, data, null, meta);
    }

    static created(message = "Resource created successfully", data = null, meta = {}) {
        return new CustomResponse(true, 201, message, data, null, meta);
    }

    static accepted(message = "Request accepted successfully", data = null, meta = {}) {
        return new CustomResponse(true, 202, message, data, meta);
    }

    static noContent(message = "No content", data = null, meta = {}) {
        return new CustomResponse(true, 204, message, data, meta);
    }


    send(res) {
        return res.status(this.statusCode).json(this.toJSON());
    }

    toJSON() {
        const response = {
            success: this.success, statusCode: this.statusCode, message: this.message
        };

        if (this.data !== null) response.data = this.data;
        response.meta = this.meta
        return response;
    }
}

export default CustomResponse
