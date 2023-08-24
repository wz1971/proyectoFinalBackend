import mongoose from "mongoose"

const msgCollection = "messages"

const msgSchema = new mongoose.Schema({
  user: String,
  message: String,
})

export const msgModel = mongoose.model(msgCollection, msgSchema)
