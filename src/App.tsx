import { useContext } from "react"
import { LoginBox } from "./components/loginBox"
import { MessageList } from "./components/messageList"
import { SendMessageForm } from "./components/sendMessageForm"
import { AuthContext } from "./context/auth"
import styles from "./styles/App.module.scss"

export function App() {
  const { user } = useContext(AuthContext)

  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  )
}
