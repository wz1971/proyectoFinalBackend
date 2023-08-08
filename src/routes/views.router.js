import express from "express"
import ProductManager from "../ProductManager.js"

const viewsRouter = express.Router()
const prodman = new ProductManager()
//const socket = io()

viewsRouter.get("/", async (req, res) => {
  try {
    const products = await prodman.getProducts()
    res.render("index", products)
  } catch (err) {
    console.error("Unable to return values - ", err)
    res.status(500).send({ status: "Internal error.", description: "Unable to read products." })
  }
})

viewsRouter.get("/realTimeProducts", async (req, res) => {
  //  socket.on("listRefresh", data)
  res.render("realTimeProducts", {})
})

export default viewsRouter
