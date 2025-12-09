import mongoose from "mongoose";


const saleSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model("Sale", saleSchema, "sales");
