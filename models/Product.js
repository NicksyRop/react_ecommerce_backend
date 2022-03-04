const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: string, required: true },
    categories: { type: Array },
    size: { type: string },
    price: { type: Number, required: true },
    color: { type: string },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
