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
      limit = 10,
    } = req.query;

    const query = {};


    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } },
      ];
    }

    
    if (region) query.customerRegion = { $in: region.split(",") };
    if (gender) query.gender = { $in: gender.split(",") };
    if (category) query.productCategory = { $in: category.split(",") };
    if (paymentMethod)
      query.paymentMethod = { $in: paymentMethod.split(",") };
    if (tags) query.tags = { $in: tags.split(",") };


    if (minAge && maxAge) {
      query.age = { $gte: Number(minAge), $lte: Number(maxAge) };
    }


    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

  
    let sortConfig = {};
    if (sortBy === "name_asc") sortConfig.customerName = 1;
    if (sortBy === "date_desc") sortConfig.date = -1;
    if (sortBy === "qty_desc") sortConfig.quantity = -1;

    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;

  
    const totalRecords = await Sale.countDocuments(query);


    const sales = await Sale.find(query)
      .sort(sortConfig)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    
    const metricsAgg = await Sale.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          // make sure these field names match your schema
          totalUnits: { $sum: { $ifNull: ["$quantity", 0] } },
          totalAmount: { $sum: { $ifNull: ["$finalAmount", 0] } },
          
          totalDiscount: {
            $sum: {
              $subtract: [
                { $ifNull: ["$totalAmount", 0] },
                { $ifNull: ["$finalAmount", 0] },
              ],
            },
          },
        },
      },
    ]);

    const metrics =
      metricsAgg[0] || { totalUnits: 0, totalAmount: 0, totalDiscount: 0 };

    res.json({
      success: true,
      data: sales,
      metrics,
      totalPages: Math.ceil(totalRecords / pageSize),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
