import dotenv from 'dotenv';

dotenv.config();

export const BASE_API_URL = process.env.BASE_API_URL
export const BASE_AUTH_URL = process.env.BASE_AUTH_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;

export const NODE_ENV = process.env.NODE_ENV;
export const MONGODB_URI = process.env.MONGODB_URI;
export const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
export const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
export const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES_IN
export const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES_IN
export const WHITELIST = [
    {path: '/e-com/auth/users/login', method: 'POST'},
    {path: '/e-com/auth/users/register', method: 'POST'},
    {path: '/e-com/auth/users/logout', method: 'POST'},
    {path: '/e-com/auth/users/refresh', method: 'GET'},
    {path: '/e-com/api/products/all', method: 'GET'},
    {path: '/e-com/api/products/filter', method: 'GET'},


]
export const CORS_OPTIONS = {
  origin: (origin, callback) => {
    // Allow non-browser requests (Render health checks, curl, etc.)
    if (!origin) return callback(null, true);
    const allowed = new Set([FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"]);
    return allowed.has(origin)
      ? callback(null, true)
      : callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

export const EMAIL_USER = process.env.EMAIL_USER
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

