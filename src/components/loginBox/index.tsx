import styles from "./styles.module.scss"
import { VscGithubInverted } from "react-icons/vsc"
import { AuthContext } from "../../context/auth"
import { useContext } from "react"

export const LoginBox = () => {
  const { signInUrl } = useContext(AuthContext)

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGitHub}>
        <VscGithubInverted size="24" />
        Entrar com o GitHub
      </a>
    </div>
  )
}
