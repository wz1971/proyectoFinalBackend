import mongoose from "mongoose"

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
  id: Number,
  products: Array,
})

export const cartModel = mongoose.model(cartCollection, cartSchema)
