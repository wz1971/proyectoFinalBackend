import { cartModel } from "./models/cart.model.js"

class CartManager {
  constructor() {}

  async getCartById(cartId) {
    try {
      return (await cartModel.findOne({ _id: cartId }).lean()) || false
    } catch (err) {
      console.error("Unable to find cart in list - ", err)
    }
  }

  async addCart(cart) {
    try {
      return await cartModel.create(cart)
    } catch (err) {
      console.error("Unable to add cart - ", err)
      return false
    }
  }

  async addProdToCart(prodId, cartId, qty) {
    try {
      const cart = await cartModel.findOne({ _id: cartId }) //.lean()
      if (cart.products.length > 0) {
        let prod = cart.products.find((item) => item._id.toString() === prodId)
        if (prod) {
          qty ? (prod.quantity += qty) : (prod.quantity += 1)
        } else {
          const newProd = {
            _id: prodId,
            product: prodId,
            quantity: qty ? qty : 1,
          }
          cart.products.push(newProd)
        }
      } else {
        const newProd = {
          _id: prodId,
          product: prodId,
          quantity: qty ? qty : 1,
        }
        cart.products.push(newProd)
      }
      return await cartModel.updateOne({ _id: cartId }, cart)
    } catch (err) {
      console.error("Unable to add product to cart - ", err)
    }
  }

  async delProdFromCart(prodId, cartId) {
    try {
      const cart = await cartModel.findOne({ _id: cartId }).lean()
      if (cart.products.length > 0) {
        let newProdList = cart.products.filter((item) => item.product !== prodId)
        return await cartModel.updateOne({ _id: cartId }, { products: newProdList })
      }
    } catch (err) {
      console.error("Unable to delete product from cart - ", err)
    }
  }

  async emptyCart(cartId) {
    try {
      const cart = await cartModel.findOne({ _id: cartId }).lean()
      if (cart) {
        let newProdList = []
        return await cartModel.updateOne({ _id: cartId }, { products: newProdList })
      } else {
        return false
      }
    } catch (error) {
      console.error("Unable to delete products from cart - ", err)
    }
  }

  async bulkAddToCart(cartId, prodArray) {
    try {
      const cart = await cartModel.findOne({ _id: cartId }).lean()
      if (cart) {
        for (let i = 0; i < prodArray.length; i++) {
          await this.addProdToCart(prodArray[i].id, cartId, prodArray[i].quantity)
        }
        return true
      } else {
        return false
      }
    } catch (err) {
      console.error("Unable to add products to cart - ", err)
    }
  }
}

export default CartManager
