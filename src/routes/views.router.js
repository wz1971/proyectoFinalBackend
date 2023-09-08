import express from "express"
import ProductManager from "../dao/ProductManager.js"
import CartManager from "../dao/CartManager.js"

const viewsRouter = express.Router()
const prodman = new ProductManager()
const cartman = new CartManager()

viewsRouter.get("/", async (req, res) => {
  try {
    const prodList = await prodman.getProducts(req.query)
    const products = prodList.payload
    res.render("products", { products: products })
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

viewsRouter.get("/carts/:cid", async (req, res) => {
  try {
    const prodList = await cartman.getCartById(req.params.cid)
    const products = prodList.products
    res.render("cart", { products: products })
  } catch (err) {
    console.error("Unable to return values - ", err)
    res.status(500).send({ status: "Internal error.", description: "Unable to read products." })
  }
})

viewsRouter.get("/login", (req, res) => {
  res.render("login")
})

viewsRouter.get("/register", (req, res) => {
  res.render("register")
})

viewsRouter.get("/profile", (req, res) => {
  res.render("profile")
})

export default viewsRouter
