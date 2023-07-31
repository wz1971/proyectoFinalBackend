import { Router } from "express"
import ProductManager from "../ProductManager.js"

const productsRouter = Router()
const prodman = new ProductManager()

productsRouter.get("/", async (req, res) => {
  try {
    const limit = Number(req.query.limit)
    const prodList = await prodman.getProducts()
    if (limit < 0 || !limit) {
      let fullList = [...prodList]
      res.send(fullList)
    }
    let filteredList = prodList.slice(0, limit)
    res.send(filteredList)
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
      res.status(404).send({ status: "404", description: "Product not found" })
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
      res.send({ status: "OK", description: "Product updated." })
    }
  } catch (err) {
    console.log("Unable to add product - ", err)
    res.status(500).send({ status: "Internal error.", description: "Unable to add product." })
  }
})

export default productsRouter
