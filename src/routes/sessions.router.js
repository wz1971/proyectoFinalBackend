import express from "express"
import UserManager from "../dao/UserManager.js"
import { createHash } from "../utils.js"
import { isValidPassword } from "../utils.js"

const sessionsRouter = express.Router()
const userman = new UserManager()

sessionsRouter.get("/login", async (req, res) => {
  let { user, pass } = req.query

  if (!user || !pass) {
    return res.status(400).send({ status: "Error", message: "Please fill the mandatory fields." })
  }

  const userLogged = await userman.login(user)

  if (!isValidPassword(userLogged, pass)) {
    return res.status(401).send({ status: "Error", message: "Wrong password." })
  }

  delete userLogged.password
  req.session.user = userLogged

  if (userLogged) {
    res.send({ status: "OK", message: "Welcome, " + userLogged.first_name + "!" })
  } else {
    res.status(401).send({ status: "Error", message: "Unable to log user in." })
  }
})

sessionsRouter.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).send({ status: "Error", message: "Please fill the mandatory fields." })
  }

  const user = { first_name, last_name, email, age, password: createHash(password) }
  const userRegistered = await userman.addUser(user)

  if (userRegistered) {
    res.send({ status: "OK", message: userRegistered })
  } else {
    res.status(401).send({ status: "Error", message: "Unable to register user." })
  }
})
