import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const prodCollection = "products"

const prodSchema = new mongoose.Schema({
  code: String,
  description: String,
  price: Number,
  stock: Number,
  thumbnail: String,
  category: String,
  title: String,
})

prodSchema.plugin(mongoosePaginate)

export const prodModel = mongoose.model(prodCollection, prodSchema)
