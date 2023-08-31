import express from "express"
import ProductManager from "../dao/ProductManager.js"

const viewsRouter = express.Router()
const prodman = new ProductManager()

viewsRouter.get("/", async (req, res) => {
  try {
    const prodList = await prodman.getProducts(req.query)
    const products = prodList.payload
    res.render("products", products)
  } catch (err) {
    console.error("Unable to return values - ", err)
    res.status(500).send({ status: "Internal error.", description: "Unable to read products." })
  }
})

viewsRouter.get("/realTimeProducts", async (req, res) => {
  res.render("realTimeProducts", {})
})

viewsRouter.get("/products", async (req, res) => {
  try {
    const prodList = await prodman.getProducts(req.query)
    const products = prodList.payload
    res.render("products", { products: products })
  } catch (err) {
    console.error("Unable to return values - ", err)
    res.status(500).send({ status: "Internal error.", description: "Unable to read products." })
  }
})

export default viewsRouter
