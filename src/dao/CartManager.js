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
      const cart = await cartModel.findOne({ _id: cartId }).lean()
      if (cart.products.length > 0) {
        let product = cart.products.find((item) => item.product === prodId)
        product
          ? qty
            ? (product.quantity += qty)
            : (product.quantity += 1)
          : cart.products.push({ product: prodId, quantity: qty ? qty : 1 })
      } else {
        const newProd = { product: prodId, quantity: qty ? qty : 1 }
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
      let newProdList = []
      return await cartModel.updateOne({ _id: cartId }, { products: newProdList })
    } catch (error) {
      console.error("Unable to delete products from cart - ", err)
    }
  }
}

export default CartManager
