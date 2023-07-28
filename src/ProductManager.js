const { log } = require("console")
const fs = require("fs")

class ProductManager {
  //ToDo enhance ID management maybe using UUIDs or other random string
  currentId = 50

  //ToDo analyze if logic to initialize prod array would be necessary
  constructor() {
    this.prodFile = "../resources/products.json"
    this.products = []
  }

  async getProducts() {
    try {
      this.products = JSON.parse(await this.readDataFile(this.prodFile))
      return this.products
    } catch (err) {
      console.error("Error fetching product list - ", err)
    }
  }

  async getProductById(prodId) {
    try {
      this.products = JSON.parse(await this.readDataFile(this.prodFile))
      return this.products.find((product) => product.id === prodId) || console.error("Product not found.")
    } catch (err) {
      console.error("Unable to find product in list - ", err)
    }
  }

  async addProduct(product) {
    try {
      if (!Object.values(product).every((val) => val)) {
        console.error("Error! All properties must be provided.")
      }
      this.products = await this.getProducts()
      if (this.products.some((prod) => prod.code === product.code)) {
        console.error("Error! Product code already exists.")
      } else {
        this.currentId += 1
        this.products.push({ ...product, id: this.currentId })
        await this.writeDataFile(this.prodFile, JSON.stringify(this.products))
      }
    } catch (err) {
      console.error("Unable to add product - ", err)
    }
  }

  async deleteProduct(prodId) {
    try {
      const prodList = await this.getProducts()
      this.products = prodList.filter((item) => item.id !== prodId)
      await this.writeDataFile(this.prodFile, JSON.stringify(this.products))
    } catch (err) {
      console.error("Unable to delete product -", err)
    }
  }

  async updateProduct(prodId, newprod) {
    try {
      //ToDo enhance code below using Object.assign
      this.products = await this.getProducts()
      let idx = this.products.findIndex((item) => item.id === prodId)
      if (idx >= 0) {
        this.products[idx].title = newprod.title
        this.products[idx].description = newprod.description
        this.products[idx].price = newprod.price
        this.products[idx].thumbnail = newprod.thumbnail
        this.products[idx].code = newprod.code
        this.products[idx].stock = newprod.stock
        await this.writeDataFile(this.prodFile, JSON.stringify(this.products))
      } else {
        console.log("Product Id not found.")
      }
    } catch (err) {
      console.error("Unable to update product - ", err)
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
}

module.exports = ProductManager
