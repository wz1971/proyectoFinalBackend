import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

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

prodSchema.plugin(mongoosePaginate)

export const prodModel = mongoose.model(prodCollection, prodSchema)
