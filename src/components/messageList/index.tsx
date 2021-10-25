import styles from "./styles.module.scss"
import { api } from "../../services/api"
import { useEffect, useState } from "react"
import io from "socket.io-client"
// Images
import logoImg from "../../assets/logo.svg"

// Types
type Message = {
  id: string
  text: string
  user: { name: string; avatar_url: string }
}

const messagesQueue: Message[] = []

const url = "http://localhost:4000"
const socket = io(url)

socket.on("new_message", (newMessage: Message) => {
  messagesQueue.push(newMessage)
})

export const MessageList = () => {
  // Message's state will store a messages list
  const [messages, setMessage] = useState<Message[]>([])

  // Load the messages
  useEffect(() => {
    api.get<Message[]>("/messages/last3").then((res) => {
      setMessage(res.data)
    })
  }, [])

  // Reload the messages

  useEffect(() => {
    const delay = 3000
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        // if there is an empety message, then the boolean will filter it
        setMessage((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        )
        messagesQueue.shift()
      }
    }, delay)
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWile" />

      <ul className={styles.messageList}>
        {messages.map((message) => {
          return (
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImg}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span> {message.user.name}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
