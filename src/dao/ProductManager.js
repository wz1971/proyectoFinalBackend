import { prodModel } from "./models/product.model.js"

class ProductManager {
  //ToDo enhance ID management maybe using UUIDs or other random string or remove this linear ID and use Mongo's Ids
  currentId = 50

  constructor() {}

  async getProducts() {
    try {
      const prodList = await prodModel.find().lean()
      return prodList
    } catch (err) {
      console.error("Error fetching product list - ", err)
    }
  }

  async getProductById(prodId) {
    try {
      const product = await prodModel.find({ id: prodId }).lean()
      return product
    } catch (err) {
      console.error("Unable to find product in list - ", err)
    }
  }

  async addProduct(product) {
    try {
      if (!Object.values(product).every((val) => val)) {
        console.error("Error! All properties must be provided.")
      }
      const prodList = await prodModel.find({ code: product.code }).lean()
      if (prodList.length > 0) {
        console.error("Error! Product code already exists.")
        return false
      } else {
        this.currentId += 1
        const newProduct = { ...product, id: this.currentId }
        return await prodModel.create(newProduct)
      }
    } catch (err) {
      console.error("Unable to add product - ", err)
      return false
    }
  }

  async deleteProduct(prodId) {
    try {
      return await prodModel.deleteOne({ id: prodId })
    } catch (err) {
      console.error("Unable to delete product -", err)
      return false
    }
  }

  async updateProduct(prodId, newprod) {
    try {
      return await prodModel.updateOne({ id: prodId }, newprod)
    } catch (err) {
      console.error("Unable to update product - ", err)
      return false
    }
  }
}

export default ProductManager
