import mongoose from "mongoose";

const generalOrdersSchema = new mongoose.Schema({
  customer: String,
  productsName: String,
  color: String,
  size: String,
  products: Number,
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GeneralOrders =
  mongoose.models.GeneralOrders ||
  mongoose.model("GeneralOrders", generalOrdersSchema);

export default GeneralOrders;
