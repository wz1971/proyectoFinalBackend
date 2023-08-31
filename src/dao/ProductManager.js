import { prodModel } from "./models/product.model.js"

class ProductManager {
  constructor() {}

  async getProducts(params) {
    try {
      const limit = params.limit || 10
      const page = params.page || 1
      const query = (params.query && JSON.parse(params.query)) || {}
      const sort = params.sort == "asc" ? 1 : -1 || 0
      const prodList = await prodModel.paginate(query, { limit: limit, page: page, sort: { price: sort } })
      const response = {
        status: prodList.docs ? "sucess" : "error",
        payload: prodList.docs,
        prevPage: prodList.prevPage,
        nextPage: prodList.nextPage,
        hasPrevPage: prodList.hasPrevPage,
        hasNextPage: prodList.hasNextPage,
        prevlink: prodList.hasPrevPage
          ? "http://localhost:8080/api/products?limit=" + limit + "&page=" + prodList.prevPage
          : null,
        nextLink: prodList.hasNextPage
          ? "http://localhost:8080/api/products?limit=" + limit + "&page=" + prodList.nextPage
          : null,
      }
      return response
    } catch (err) {
      console.error("Error fetching product list - ", err)
    }
  }

  async getProductById(prodId) {
    try {
      const product = await prodModel.find({ _id: prodId }).lean()
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
        return await prodModel.create(product)
      }
    } catch (err) {
      console.error("Unable to add product - ", err)
      return false
    }
  }

  async deleteProduct(prodId) {
    try {
      return await prodModel.deleteOne({ _id: prodId })
    } catch (err) {
      console.error("Unable to delete product -", err)
      return false
    }
  }

  async updateProduct(prodId, newprod) {
    try {
      return await prodModel.updateOne({ _id: prodId }, newprod)
    } catch (err) {
      console.error("Unable to update product - ", err)
      return false
    }
  }
}

export default ProductManager
