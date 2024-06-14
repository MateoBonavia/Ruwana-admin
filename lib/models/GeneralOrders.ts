import mongoose from "mongoose";

const generalOrdersSchema = new mongoose.Schema({
  name: String,
  products: [
    {
      title: String,
      color: String,
      size: String,
      quantity: Number,
    },
  ],
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
