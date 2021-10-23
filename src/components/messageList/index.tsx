import styles from "./styles.module.scss"
import { api } from "../../services/api"
import { useEffect, useState } from "react"

// Images
import logoImg from "../../assets/logo.svg"
// External paths
const imgGitHub = "https://github.com/rwellingtonr.png"

// Types
type Message = {
  id: string
  text: string
  user: { name: string; avatar_url: string }
}

export const MessageList = () => {
  // Message's state will store a messages list
  const [message, setMessage] = useState<Message[]>([])

  // Load the messages
  useEffect(() => {
    api.get("/messages/last3").then((res) => {
      console.log(res.data)
    })
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWile" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImg}>
              <img src={imgGitHub} alt="Wellington" />
            </div>
            <span> Wellington</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImg}>
              <img src={imgGitHub} alt="Wellington" />
            </div>
            <span> Wellington</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImg}>
              <img src={imgGitHub} alt="Wellington" />
            </div>
            <span> Wellington</span>
          </div>
        </li>
      </ul>
    </div>
  )
}
