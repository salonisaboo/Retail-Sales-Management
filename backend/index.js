import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/connectDB.js";
import salesRoutes from "./src/routes/salesRoutes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());


connectDB();

app.use("/api/sales", salesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
