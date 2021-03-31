const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        size: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Plasata",
      enum: [
        "Plasata",
        "In curs de procesare",
        "Plata ramburs",
        "Expediata",
        "Anulata",
        "Finalizata",
      ],
    },
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
