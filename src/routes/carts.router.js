import { Router } from "express"
import CartManager from "../dao/CartManager.js"

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
    const cid = req.params.cid
    const cart = await cartman.getCartById(cid)
    if (cart) {
      res.send(cart)
    } else {
      res.status(404).send({ status: "Not found", description: "Cart not found" })
    }
  } catch (err) {
    console.error("Error retrieving cart - ", err)
  }
})

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
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

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const cart = await cartman.getCartById(cid)
    if (cart) {
      if (await cartman.delProdFromCart(pid, cid)) {
        res.send({ status: "OK", description: "Product successfully deleted from cart." })
      } else {
        res.status(500).send({ status: "Internal error", description: "Unable to delete product from cart" })
      }
    }
  } catch (err) {
    console.error("Error deleting product from cart - ", err)
  }
})

cartsRouter.delete("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid
    const cart = await cartman.getCartById(cid)
    if (cart) {
      if (await cartman.emptyCart(cid)) {
        res.send({ status: "OK", description: "Cart successfully emptied." })
      } else {
        res.status(500).send({ status: "Internal error", description: "Unable to empty cart." })
      }
    }
  } catch (err) {
    console.error("Error deleting products from cart - ", err)
  }
})

cartsRouter.put("/:cid/:product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const qty = req.body.quantity
    const cart = await cartman.getCartById(cid)
    if (cart) {
      if (await cartman.addProdToCart(pid, cid, qty)) {
        res.send({ status: "OK", description: "Product successfully added to cart." })
      } else {
        res.status(500).send({ status: "Internal error", description: "Unable to add product to cart" })
      }
    }
  } catch (err) {
    console.error("Error adding product to cart - ", err)
  }
})

cartsRouter.put("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid
    const prods = req.body
    const cart = await cartman.getCartById(cid)
    if (cart) {
      if (await cartman.bulkAddToCart(cid, prods)) {
        res.send({ status: "OK", description: "Product list successfully added to cart." })
      } else {
        res.status(500).send({ status: "Internal error", description: "Unable to add product list to cart" })
      }
    }
  } catch (err) {
    console.error("Error adding product to cart - ", err)
  }
})

export default cartsRouter
