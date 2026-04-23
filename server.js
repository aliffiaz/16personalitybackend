import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./Routes/user.js";
import mbtiRoutes from "./Routes/mbti.js";
import personalitySubRoutes from "./Routes/personalitySub.js";
import aiAssistanceRoutes from "./Routes/aiAssistance.js";

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL || [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8000"
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/student", userRoutes); // Used /api/student to match frontend routes
app.use("/api/mbti", mbtiRoutes);
app.use("/api/personality-sub", personalitySubRoutes);
app.use("/api/ai-assistance", aiAssistanceRoutes);

app.get("/", (req, res) => {
    res.send("Personality Test Backend API is running");
});

mongoose.connect(process.env.MONGO_URI, )
.then(() => {
    console.log("Connected to MongoDB successfully");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
