import express from "express"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import { Server } from "socket.io"
import ProductManager from "./dao/ProductManager.js"
import ChatManager from "./dao/ChatManager.js"
import mongoose from "mongoose"

const PORT = 8080
const app = express()

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}.`)
})

const io = new Server(httpServer)
const prodman = new ProductManager()
const chatman = new ChatManager()

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

app.use("/api/products/", productsRouter)
app.use("/api/carts/", cartsRouter)
app.use("/", viewsRouter)

mongoose.connect(
  "mongodb+srv://coder_backend:xJvndIogNKToswVD@coderbackend.q5qvbhl.mongodb.net/ecommerce?retryWrites=true&w=majority"
)

io.on("connection", async (socket) => {
  console.log("Client Id: " + socket.id + " connected ")
  const prodList = await prodman.getProducts({})
  socket.emit("renderProducts", prodList)

  socket.on("prodChange", async () => {
    console.log("Update received")
    const prodList = await prodman.getProducts({})
    socket.broadcast.emit("renderProducts", prodList)
  })
})
