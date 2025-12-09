import axios from "axios";

const API_BASE = "https://retail-sales-management-backend-0d88.onrender.com";

export async function fetchSales(params) {
  const res = await axios.get(`${API_BASE}/sales`, { params });
  return res.data;
}
