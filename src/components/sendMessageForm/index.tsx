import { useContext } from "react"
import { VscGithubInverted, VscSignOut } from "react-icons/vsc"
import { AuthContext } from "../../context/auth"
import styles from "./styles.module.scss"

export const SendMessageForm = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton}>
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

      <form className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea name="message" id="message" placeholder="Mensagem">
          Qual é a sua expectativa para o evento?
        </textarea>
        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
}
