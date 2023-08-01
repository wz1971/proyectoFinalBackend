import { Router } from "express"
import CartManager from "../CartManager.js"

const cartsRouter = Router()
const cartman = new CartManager()

cartsRouter.post("/", async (req, res) => {
  try {
    if (await cartman.addCart()) {
      res.send({ status: "OK", description: "New cart successfully added." })
    } else {
      res.status(500).send({ status: "Internal error", description: "Unable to create new cart." })
    }
  } catch (err) {
    console.error("Error adding cart - ", err)
  }
})

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const cid = Number(req.params.cid)
    const cart = await cartman.getCartById(cid)
    if (cart) {
      res.send({ products: cart.products })
    } else {
      res.status(404).send({ status: "Not found", description: "Cart not found" })
    }
  } catch (err) {
    console.error("Error retrieving cart - ", err)
  }
})

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = Number(req.params.cid)
    const pid = Number(req.params.pid)
    const cart = await cartman.getCartById(cid)

    if (cart) {
      if (await cartman.addProdToCart(pid, cid)) {
        res.send({ status: "OK", description: "Product successfully added to cart." })
      } else {
        res.status(500).send({ status: "Internal error", description: "Unable to add product to cart" })
      }
    }
  } catch (err) {
    console.error("Error adding product to cart - ", err)
  }
})

export default cartsRouter
