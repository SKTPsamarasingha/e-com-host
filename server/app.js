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

// Needed on Render so secure cookies work behind proxy/load balancer
app.set("trust proxy", 1);

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});