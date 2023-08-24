import { cartModel } from "./models/cart.model.js"

class CartManager {
  currentId = 0

  constructor() {}

  async getCartById(cartId) {
    try {
      return (await cartModel.findOne({ id: cartId }).lean()) || false
    } catch (err) {
      console.error("Unable to find cart in list - ", err)
    }
  }

  async addCart(cart) {
    try {
      this.currentId += 1
      return await cartModel.create({ ...cart, id: this.currentId })
    } catch (err) {
      console.error("Unable to add cart - ", err)
      return false
    }
  }

  async addProdToCart(prodId, cartId) {
    try {
      const cart = await cartModel.findOne({ id: cartId }).lean()
      if (cart.products.length > 0) {
        let product = cart.products.find((item) => item.id === prodId)
        product ? (product.quantity += 1) : cart.products.push({ product: prodId, quantity: 1 })
      } else {
        const newProd = { product: prodId, quantity: 1 }
        cart.products.push(newProd)
      }
      return await cartModel.updateOne({ id: cartId }, cart)
    } catch (err) {
      console.error("Unable to add product to cart - ", err)
    }
  }
}

export default CartManager
