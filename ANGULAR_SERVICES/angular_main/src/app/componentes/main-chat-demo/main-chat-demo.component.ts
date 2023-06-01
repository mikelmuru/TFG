import { Component, OnInit } from '@angular/core';
import { ChatDemoDTO } from 'src/app/dtos/ChatDemoDTO';
import { io } from 'socket.io-client';
import { Message } from 'src/app/dtos/Message';


@Component({
  selector: 'app-main-chat-demo',
  templateUrl: './main-chat-demo.component.html',
  styleUrls: ['./main-chat-demo.component.css']
})
export class MainChatDemoComponent implements OnInit{

  // VARIABLES PARA MENU LATERAL --------------------------------------------
  public allChats: ChatDemoDTO[] = [
    new ChatDemoDTO('chat1'),
    new ChatDemoDTO('chat2'),
    new ChatDemoDTO('chat3'),
    new ChatDemoDTO('chat4'),
    new ChatDemoDTO('chat5'),
    new ChatDemoDTO('chat6'),
    new ChatDemoDTO('chat7'),
    new ChatDemoDTO('chat8'),
    new ChatDemoDTO('chat9'),
    new ChatDemoDTO('chat10'),
    new ChatDemoDTO('chat11'),
    new ChatDemoDTO('chat12'),
  ]

  // VARIABLES PARA CHAT SELECCIONADO ---------------------------------------
  public actualChat!: ChatDemoDTO
  public actualChatId: number = -1

  // VARIABLE PARA LA CONEXION CON EL SOCKET --------------------------------
  private socket = io('http://localhost:3000/', {
    withCredentials: true,
    autoConnect: true
  })

  private messageListener:any = (remotemessage:any) => {
    const existingMessageIndex = this.allChats[this.actualChatId].getMessages()
      .findIndex((message) => message.getText() === remotemessage.text)

    if (existingMessageIndex === -1) {
      var message = new Message(remotemessage.who, remotemessage.text)
      message.setFrom(remotemessage.from)

      this.allChats[this.actualChatId].setMessages(message)
    }
  }


  // AQUI EMPIEZAN LOS METODOS ==========================================
  // ====================================================================


  ngOnInit(): void {
    this.socket.on('newChatCreation', (info) => {
      const existingChatIndex = this.allChats.findIndex((chat) => chat.getChatName() === info.newChatName)

      if (existingChatIndex === -1) {
        var newChat = new ChatDemoDTO(info.newChatName)

        this.allChats.push(newChat)

        console.log('Credo nuevo chat: ' + info.newChatName)
      }
    })
  }  

  listenRemote() {
    this.socket.on(this.allChats[this.actualChatId].getChatName() + '_response', this.messageListener)
  }

  changeLoadChat(index: number) {
    this.actualChatId = index
    var newChatName = this.allChats[this.actualChatId].getChatName()

    this.socket.emit('changeChat', newChatName)
    console.log('Emitiendo "changeChat" para conectarse a la sala: ' + newChatName)
    this.listenRemote()
  }

  sendMessage(who: string, text: string, whoinput: any, textinput: any) {

    // Creo la instancia del mensaje tipo Message
    var message = new Message(who, text)
    message.setFrom('local')

    // Actualizo la lista de mensajes de mi chat
    this.allChats[this.actualChatId].setMessages(message)

    // Enviamos el mensaje al canal SUPER
    // this.socket.emit('super', this.allChats[this.actualChatId].getChatName(), message)
    this.socket.emit('super', {
      message: { chatname: this.allChats[this.actualChatId].getChatName(), message: message },
      room: this.allChats[this.actualChatId].getChatName()
    })

    whoinput.value = ''
    textinput.value = ''
  }

  createNewChat(chatnameinput:any,name:string) {
    if (name != null && name != '') {
      var newChat = new ChatDemoDTO(name)
      this.allChats.push(newChat)
      this.socket.emit('newChat', {chatName: name})
      chatnameinput.value = ''
    }
  }

}
