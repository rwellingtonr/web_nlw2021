import styles from "./styles.module.scss"
import { api } from "../../services/api"
import { useEffect, useState } from "react"

// Images
import logoImg from "../../assets/logo.svg"

// Types
type Message = {
  id: string
  text: string
  user: { name: string; avatar_url: string }
}

export const MessageList = () => {
  // Message's state will store a messages list
  const [messages, setMessage] = useState<Message[]>([])

  // Load the messages
  useEffect(() => {
    api.get<Message[]>("/messages/last3").then((res) => {
      setMessage(res.data)
    })
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
