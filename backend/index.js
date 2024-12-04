import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Connected to Server",
        success: true
    })
})
//dbPassword:OmSaiRam
//connectionString:mongodb+srv://dbUser:OmSaiRam@cluster0.rmrp7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({ extended: true }))

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}

app.use(cors(corsOptions));
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at port ${PORT}`)
})