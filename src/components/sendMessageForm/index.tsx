import { FormEvent, useContext, useState } from "react"
import { VscGithubInverted, VscSignOut } from "react-icons/vsc"
import { AuthContext } from "../../context/auth"
import styles from "./styles.module.scss"
import { api } from "../../services/api"

export const SendMessageForm = () => {
  const { user, signOut } = useContext(AuthContext)

  const [message, setMessage] = useState("")

  const handleSendMessage = async (event: FormEvent) => {
    // Avoid to reload the page
    event.preventDefault()

    if (!message.trim()) {
      return
    }
    await api.post("messages", { message })
  }
  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size="32" />
      </button>
      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGitHub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        >
          Qual é a sua expectativa para o evento?
        </textarea>
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
}
