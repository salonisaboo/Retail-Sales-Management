import express from "express";
import { getFilteredSales } from "../utils/salesUtils.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await getFilteredSales(req.query);

    res.json({
      success: true,
      data: result.data,
      metrics: result.metrics,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
