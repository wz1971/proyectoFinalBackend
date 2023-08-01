import { Router } from "express"
import CartManager from "../CartManager.js"

const cartsRouter = Router()
const cartman = new CartManager()
