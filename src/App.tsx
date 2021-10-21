import { LoginBox } from "./components/loginBox"
import { MessageList } from "./components/messageList"
import styles from "./styles/App.module.scss"

export function App() {
  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      <LoginBox />
    </main>
  )
}
