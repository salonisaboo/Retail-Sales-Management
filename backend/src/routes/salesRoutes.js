import express from "express";
import Sale from "../models/Sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      region = "",
      gender = "",
      category = "",
      tags = "",
      paymentMethod = "",
      minAge = "",
      maxAge = "",
      startDate = "",
      endDate = "",
      sortBy = "name_asc",
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    // SEARCH
    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } }
      ];
    }

    // MULTI SELECT FILTERS
    if (region) query.customerRegion = { $in: region.split(",") };
    if (gender) query.gender = { $in: gender.split(",") };
    if (category) query.productCategory = { $in: category.split(",") };
    if (paymentMethod)
      query.paymentMethod = { $in: paymentMethod.split(",") };
    if (tags) query.tags = { $in: tags.split(",") };

    // AGE RANGE
    if (minAge && maxAge) {
      query.age = { $gte: Number(minAge), $lte: Number(maxAge) };
    }

    // DATE RANGE
    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

    // SORTING
    let sortConfig = {};
    if (sortBy === "name_asc") sortConfig.customerName = 1;
    if (sortBy === "date_desc") sortConfig.date = -1;
    if (sortBy === "qty_desc") sortConfig.quantity = -1;

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const totalRecords = await Sale.countDocuments(query);

    const sales = await Sale.find(query)
      .sort(sortConfig)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    // METRICS
    const metrics = {
      totalUnits: sales.reduce((sum, s) => sum + (s.quantity || 0), 0),
      totalAmount: sales.reduce((sum, s) => sum + (s.finalAmount || 0), 0),
      totalDiscount: sales.reduce(
        (sum, s) => sum + (s.discountPercentage || 0),
        0
      )
    };

    res.json({
      success: true,
      data: sales,
      metrics,
      totalPages: Math.ceil(totalRecords / pageSize)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
