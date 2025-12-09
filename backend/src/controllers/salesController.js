import { getFilteredSales } from "../utils/salesUtils.js";

export const getSales = async (req, res) => {
  try {
    const result = await getFilteredSales(req.query);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
