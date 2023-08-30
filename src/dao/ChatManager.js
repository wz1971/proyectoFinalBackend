import { msgModel } from "./models/message.model.js"

class ChatManager {
  async getMessages() {
    return await msgModel.find().lean()
  }

  async createMessage(message) {
    return await msgModel.create(message)
  }

  async deleteAllMessages() {
    return await msgModel.deleteMany({})
  }
}

export default ChatManager
