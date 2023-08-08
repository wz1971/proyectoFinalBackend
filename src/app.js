import express from "express"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import { Server } from "socket.io"

const PORT = 8080
const app = express()
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}.`)
})
const socketServer = new Server(httpServer)

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

app.use("/api/products/", productsRouter)
app.use("/api/carts/", cartsRouter)
app.use("/", viewsRouter)

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado")
})

socketServer.on("listUpdate", (data) => {
  socketServer.emit("listRefresh", data)
})
