import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import salesRoutes from "./src/routes/salesRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/sales", salesRoutes);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});