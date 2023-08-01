import fs from "fs"

class CartManager {
  currentId = 0
  //ToDo analyze if logic to initialize cart array and/or file would be necessary
  constructor() {
    this.cartFile = "../resources/carts.json"
    this.carts = []
  }

  async getCarts() {
    try {
      this.carts = JSON.parse(await this.readDataFile(this.cartFile))
      return this.carts
    } catch (err) {
      console.error("Error fetching cart list - ", err)
    }
  }

  async getCartById(cartId) {
    try {
      this.carts = JSON.parse(await this.readDataFile(this.cartFile))
      return this.carts.find((cart) => cart.id === cartId) || console.error("Cart not found.")
    } catch (err) {
      console.error("Unable to find cart in list - ", err)
    }
  }

  async readDataFile(filePath) {
    try {
      const data = await fs.promises.readFile(filePath, "utf-8")
      return data
    } catch (err) {
      console.error("Error reading data file - ", err)
    }
  }

  async writeDataFile(filePath, data) {
    try {
      await fs.promises.writeFile(filePath, data)
    } catch (err) {
      console.error("Error writing data file - ", err)
    }
  }

  async addCart(cart) {
    try {
      //Verificar si toda esta lógica es necesaria - creo que no
      if (!Object.values(cart).every((val) => val)) {
        console.error("Error! All properties must be provided.")
      }
      this.carts = await this.getcarts()
      if (this.carts.some((elem) => elem.code === cart.code)) {
        console.error("Error! cart code already exists.")
        return false
      } else {
        this.currentId += 1
        this.carts.push({ ...cart, id: this.currentId })
        await this.writeDataFile(this.cartFile, JSON.stringify(this.carts))
        return true
      }
    } catch (err) {
      console.error("Unable to add cart - ", err)
      return false
    }
  }

  async addProdToCart(prodId, cartId) {
    this.carts = this.getCarts()
    if (this.carts.size() > 0) {
      const cart = this.carts.filter((item) => item.id === cartId)
      if (!cart) {
        console.log(`Cart ID ${cartId} not found.`)
        return false
      } else {
        let product = cart.products.find((item) => item.id === prodId)
        if (product) {
          product.quantity += 1
        } else {
          cart.products.push({ product: pid, quantity: 1 })
          this.writeDataFile(this.cartFile, JSON.stringify(this.carts))
          return true
        }
      }
    } else {
      console.log("No carts found.")
    }
  }
}

export default CartManager
