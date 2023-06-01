import { Message } from "./Message"

export class ChatDemoDTO {
    private chatname:string = ''
    private messages:Message[] = []

    constructor (chatname:string) {
        this.chatname = chatname
    }

    getChatName() {
        return this.chatname
    }
    getMessages() {
        return this.messages
    }
    setChatName(chatname:string) {
        this.chatname = chatname
    }
    setMessages(message:Message) {
        this.messages.push(message)
    }

    clearMessages() {
        this.messages = []
    }
}