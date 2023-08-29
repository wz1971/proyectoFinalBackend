const socket = io()
const msgBoard = document.getElementById("msgBoard")

socket.on("connect", () => {
  console.log("Connected to CHAT as: " + socket.id)
})

socket.on("messages", (data) => {
  console.log(JSON.stringify(data))
  let output = ``

  data.forEach((item) => {
    output += `<p class="card-text"><b>${item.user}:</b> <span class="fw-light">${item.message}</span></p>`
  })

  msgBoard.innerHTML = output
})

const sendMessage = () => {
  const user = document.getElementById("user")
  const message = document.getElementById("message")
  socket.emit("newMsg", { user: user.value, message: message.value })
  user.value = ""
  message.value = ""
}

const delAllMsgs = () => {
  socket.emit("delAllMsgs")
}

document.getElementById("sendMsgButton").onclick = sendMessage
document.getElementById("delAllMsgsButton").onclick = delAllMsgs
