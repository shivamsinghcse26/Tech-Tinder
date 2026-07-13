import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "1.0.0.1"]);

dotenv.config();


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);


connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
