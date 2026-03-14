import express from "express";
import {errorHandler, requestHandler} from "./middleware/handlers.js";
import cookieParser from "cookie-parser";
import compression from "compression";
import {BASE_API_URL, BASE_AUTH_URL, CORS_OPTIONS} from "./config/envConfigs.js";
import authRoutes from "./routes/auth/authRoutes.js";
import apiRoutes from "./routes/api/apiRoutes.js";
import connectDB from "./config/mongoDB.js";
import authToken from "./middleware/jwtAuth.js";
import cors from "cors";


const app = express();
const PORT = 3000;

connectDB();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.json());
app.use(compression());
app.use(cookieParser());

app.use(cors(CORS_OPTIONS));


app.use(requestHandler);

app.use(authToken)
app.use(BASE_AUTH_URL, authRoutes);
app.use(BASE_API_URL, apiRoutes);

app.use(errorHandler);


const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// server.on('error', (e) => {
//     if (e.code === 'EADDRINUSE') {
//         console.error('Port 3000 is busy. Retrying on 3001...');
//         setTimeout(() => {
//             server.close();
//             server.listen(3001);
//         }, 1000);
//     }
// });