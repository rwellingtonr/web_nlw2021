import { useEffect } from "react"
import styles from "./styles.module.scss"
import { VscGithubInverted } from "react-icons/vsc"
import { api } from "../../services/api"

type Authresponse = {
  token: string
  user: { id: string; name: string; avatar_url: string; login: string }
}

export const LoginBox = () => {
  const userId = "3f3bb88bf0b525855c51"

  const signInUrl = `https:github.com/login/oauth/authorize?scope=user&client_id=${userId}&redirect_url=http:localhost:3000`

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes("?code=")

    const signin = async (githubCode: string) => {
      const response = await api.post<Authresponse>("authenticate", {
        code: githubCode,
      })
      const { token, user } = response.data
      // Storage the user data
      localStorage.setItem("@dowhile:token", token)
      console.log("Token: ", token)
    }

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("/?code=")
      console.log({ urlWithoutCode, githubCode })
      // it won't display the url with code
      window.history.pushState({}, "", urlWithoutCode)

      signin(githubCode)
    }
  }, [])

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
