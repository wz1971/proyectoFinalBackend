const express = require("express")
const PORT = 8080
const app = express()

const ProductManager = require("./ProductManager")
const prodman = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/products", async (req, res) => {
  try {
    const limit = Number(req.query.limit)
    const prodList = await prodman.getProducts()
    if (limit < 0 || !limit) {
      let fullList = [...prodList]
      return res.status(200).send(fullList)
    }
    let filteredList = prodList.slice(0, limit)
    return res.status(200).send(filteredList)
  } catch (err) {
    console.log("Unable to return values - ", err)
  }
})

app.get("/product/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid)
    const product = await prodman.getProductById(pid)
    console.log(product)
    if (!product) {
      return res.send({ code: "400", description: "Product not found" })
    }
    return res.send(product)
  } catch (err) {
    console.log("Unable to search for product - ", err)
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}.`)
})
