import { Router } from "express"
import ProductManager from "../dao/ProductManager.js"
import { io } from "socket.io-client"

const productsRouter = Router()
const prodman = new ProductManager()
const socket = io("http://localhost:8080/")
socket.on("connect", () => {
  console.log("Connected as: " + socket.id)
})

socket.emit("testMsg", "Hello from client")

productsRouter.get("/", async (req, res) => {
  try {
    console.log(req.query)
    const prodList = await prodman.getProducts(req.query)
    res.send(prodList)
  } catch (err) {
    console.error("Unable to return values - ", err)
    res.status(500).send({ status: "Internal error.", description: "Unable to read products." })
  }
})

productsRouter.get("/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid)
    const product = await prodman.getProductById(pid)
    if (!product) {
      res.status(404).send({ status: "Not found", description: "Product not found" })
    }
    res.send(product)
  } catch (err) {
    console.error("Unable to search for product - ", err)
    res.status(500).send({ status: "Internal error.", description: "Unable to search for product." })
  }
})

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid)
    if (prodman.deleteProduct(pid)) {
      socket.emit("prodChange")
      res.send({ status: "OK", description: "Product deleted." })
    }
  } catch (err) {
    console.error("Unable to delete product - ", err)
    res.status(500).send({ status: "Internal error.", description: "Unable to search for product." })
  }
})

productsRouter.post("/", async (req, res) => {
  try {
    const propList = ["title", "description", "code", "price", "status", "stock", "category", "thumbnails"]
    const product = req.body
    const isValid = propList.every((prop) => {
      return Object.keys(product).includes(prop) && product[prop]
    })
    if (!isValid) {
      res.status(400).send({ status: "Bad Request", description: "Property or value missing." })
    } else if (!(await prodman.addProduct(product))) {
      res.status(403).send({ status: "Forbidden", description: `Product code ${product.code} already exists.` })
    } else {
      socket.emit("prodChange")
      res.send({ status: "OK", description: "Product added." })
    }
  } catch (err) {
    console.log("Unable to add product - ", err)
    res.status(500).send({ status: "Internal error.", description: "Unable to add product." })
  }
})

productsRouter.put("/:pid", async (req, res) => {
  try {
    const propList = ["title", "description", "code", "price", "status", "stock", "category", "thumbnails"]
    const product = req.body
    const pid = Number(req.params.pid)
    const isValid = propList.every((prop) => {
      return Object.keys(product).includes(prop) && product[prop]
    })
    if (!isValid) {
      res.status(400).send({ status: "Bad Request", description: "Property or value missing." })
    } else if (!(await prodman.updateProduct(pid, product))) {
      res.status(403).send({ status: "Forbidden", description: `Product id ${pid} does not exist.` })
    } else {
      socket.emit("prodChange")
      res.send({ status: "OK", description: "Product updated." })
    }
  } catch (err) {
    console.log("Unable to add product - ", err)
    res.status(500).send({ status: "Internal error.", description: "Unable to add product." })
  }
})

export default productsRouter
