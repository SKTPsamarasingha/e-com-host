import nodemailer from 'nodemailer';
import {EMAIL_PASSWORD, EMAIL_USER} from "../config/envConfigs.js";
import {logger} from "../utils/logger.js";
import {BadRequestError, InternalServerError, NotFoundError} from "../middleware/appError.js";

const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    }
})


export async function sendMail(to, sub, msg) {
    try {
        const res = await transporter.sendMail({
            from: "E-com store",
            to: to,
            subject: sub,
            html: msg,
        })
        return res.accepted[0] === to
    } catch (error) {
        logger.error({error: error.message}, "Failed to send email");
        throw new InternalServerError("Failed to send email");
    }
}
