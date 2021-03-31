const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    gemstoneComposition: {
      type: String,
      enum: ["Naturala", "Tratata", "Sintetica"],
    },
    color: {
      type: String,
      enum: ["Alb","Albastru", "Gri","Galben", "Mov", "Maro", "Multicolor", "Negru", "Portocaliu", "Rosu", "Roz",  "Transparent", "Verde"],
    },
    material: {
      type: String,
      enum: ["Aur", "Argint", "Platina"],
    },
    size: {
      type: String,
      enum: ["Standard", "52-53", "54-55", "56-57", "58-59", "60-61", "62-63"],
      default: "Standard"
    },

    stones: [
        {
          type: String,
        }
      ],
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],

  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
