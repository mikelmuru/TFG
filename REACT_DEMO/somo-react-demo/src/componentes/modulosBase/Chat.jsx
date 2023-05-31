import { useParams } from 'react-router-dom';
import { Header } from '../../utils/Header';
import * as io from 'socket.io-client'
import { useEffect, useState } from 'react';
import { readLocalStorageNoRender } from '../../custom-hooks/useLocalStorage';
import '../../css/chat.css'
import * as BsIcons from 'react-icons/bs'

const socket = io.connect('http://localhost:3000/', {
    withCredentials: true,
    autoConnect: true
})

export function Chat() {
    const { chat } = useParams()

    /*
        ESTRUCTURA DE MESSAGES:
        {
            'who':username,
            'message':mensaje,
            'from':remote/local
        }
    */
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const userTokensNick = readLocalStorageNoRender('user')

    const sendMessage = () => {
        const newmsg = {
            'who': userTokensNick.username,
            'message': newMessage,
            'from': 'local'
        }
        const sendinfo = {
            'chatname':chat,
            'message':newmsg
        }
        
        socket.emit('super', sendinfo)

        setNewMessage('')
        setMessages(messages => [...messages, newmsg])
    }

    useEffect(() => {

        socket.on(chat + '_response', (data) => {
            setMessages(messages => [...messages, data])
        })

        return () => {
            socket.off('connect')
            socket.off(chat)
        }
    }, [])

    return (
        <>
            <Header title={chat} />
            <div className="chatContainer">
                <section className="messages">
                    {
                        messages.length > 0
                        &&
                        messages.map((msg, indice) => {
                            const from = msg.who === userTokensNick.username ? 'local' : 'remote'
                            return (
                                <article
                                    key={indice}
                                    className={`chatMensaje from${from}`}
                                >
                                    <span className='chatElement chatMensajeWho'>
                                        {msg.who}
                                    </span>
                                    <span className='chatElement chatMensajeMsg'>
                                        {msg.message}
                                    </span>
                                </article>
                            )
                        })
                    }
                </section>
                <section className="newmessage">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className='newMsgInput'
                    />
                    <button
                        onClick={() => sendMessage()}
                        className='newMsgBtn'
                    >
                        <BsIcons.BsSend size={20} className='newMsgIcon'/>
                    </button>
                </section>
            </div>
        </>
    )
}