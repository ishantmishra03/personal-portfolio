import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import connectDB from "./config/db.js";
await connectDB();

import contactRouter from "./routes/contact.routes.js";

//CORS
const allowedOrigins = [
  "https://ishantmishra.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//Middlewares
app.use(express.json());

//Routes
app.use("/api/contact", contactRouter);

//trial route
app.get("/", (req, res) => {
  res.send("Working...");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
