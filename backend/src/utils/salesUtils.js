import Sale from "../models/Sales.js";

export async function getFilteredSales(query) {
  const {
    search = "",
    region,
    gender,
    category,
    tags,
    paymentMethod,
    minAge,
    maxAge,
    startDate,
    endDate,
    sortBy = "name_asc",
    page = 1,
    limit = 10
  } = query;

  const filter = {};

  // SEARCH on Customer Name + Phone Number (case-insensitive)
  if (search) {
    filter.$or = [
      { "Customer Name": { $regex: search, $options: "i" } },
      { "Phone Number": { $regex: search, $options: "i" } }
    ];
  }

  // MULTI-SELECT FILTERS
  if (region) filter["Customer Region"] = { $in: region.split(",") };
  if (gender) filter["Gender"] = { $in: gender.split(",") };
  if (category) filter["Product Category"] = { $in: category.split(",") };
  if (paymentMethod)
    filter["Payment Method"] = { $in: paymentMethod.split(",") };
  if (tags) filter["Tags"] = { $in: tags.split(",") };

  // AGE RANGE
  if (minAge || maxAge) {
    filter["Age"] = {};
    if (minAge) filter["Age"].$gte = Number(minAge);
    if (maxAge) filter["Age"].$lte = Number(maxAge);
  }

  // DATE RANGE
  if (startDate && endDate) {
    filter["Date"] = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  // SORTING
  let sort = {};
  if (sortBy === "name_asc") sort = { "Customer Name": 1 };
  else if (sortBy === "date_desc") sort = { Date: -1 };
  else if (sortBy === "qty_desc") sort = { Quantity: -1 };

  // PAGINATION
  const pageNum = Number(page) || 1;
  const perPage = Number(limit) || 10;
  const skip = (pageNum - 1) * perPage;

  const data = await Sale.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(perPage)
    .lean();

  const totalRecords = await Sale.countDocuments(filter);

  // METRICS (Total units, amount, discount)
  const metricsAgg = await Sale.aggregate([
    { $match: filter },
    {
      $group: {
        _id: null,
        totalUnits: { $sum: "$Quantity" },
        totalAmount: {
          // use Final Amount if present, else Total Amount
          $sum: { $ifNull: ["$Final Amount", "$Total Amount"] }
        },
        totalDiscount: { $sum: "$Discount Percentage" }
      }
    }
  ]);

  const metrics =
    metricsAgg[0] || { totalUnits: 0, totalAmount: 0, totalDiscount: 0 };

  return {
    data,
    totalRecords,
    totalPages: Math.ceil(totalRecords / perPage),
    currentPage: pageNum,
    metrics
  };
}
