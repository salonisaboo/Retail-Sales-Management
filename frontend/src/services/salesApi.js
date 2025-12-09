import axios from "axios";

const API_BASE = "http://localhost:4000/api";

export async function fetchSales(params) {
  const res = await axios.get(`${API_BASE}/sales`, { params });
  return res.data;
}
