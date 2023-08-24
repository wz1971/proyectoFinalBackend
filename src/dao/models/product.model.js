import mongoose from "mongoose"

const prodCollection = "products"

const prodSchema = new mongoose.Schema({
  code: String,
  description: String,
  id: Number,
  price: Number,
  stock: Number,
  thumbnail: String,
  thumbnails: Array,
  category: String,
  title: String,
})

export const prodModel = mongoose.model(prodCollection, prodSchema)
