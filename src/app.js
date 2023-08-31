import express from "express"
import __dirname from "./utils.js"
import expressHandlebars from "express-handlebars"
import Handlebars from "handlebars"
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access"
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

app.engine(
  "handlebars",
  expressHandlebars.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
)

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
  console.log("Client connected")
  const prodList = await prodman.getProducts({})
  socket.emit("renderProducts", prodList)

  socket.on("prodChange", async () => {
    const prodList = await prodman.getProducts({})
    socket.broadcast.emit("renderProducts", prodList)
  })

  socket.on("newMsg", async (data) => {
    await chatman.createMessage(data)
    const messages = await chatman.getMessages()
    socket.emit("messages", messages)
  })

  socket.on("delAllMsgs", async () => {
    await chatman.deleteAllMessages()
    const messages = []
    socket.emit("messages", messages)
  })
})
