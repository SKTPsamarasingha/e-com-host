import pino from "pino";
import {NODE_ENV} from "../config/envConfigs.js";

export const logger = pino({
    level: NODE_ENV === "production" ? "info" : "debug",
    transport: NODE_ENV !== "production"
        ? {
            target: "pino-pretty",
            options: {colorize: true}
        }
        : undefined,
});

