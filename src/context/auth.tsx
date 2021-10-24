import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "../services/api"

/*TYPE*/
type AuthProvider = {
  children: ReactNode
}

type User = { id: string; name: string; login: string; avatar_url: string }

type AuthContextData = {
  user: User | null
  signInUrl: string
  signOut: () => void
}

type Authresponse = {
  token: string
  user: { id: string; name: string; avatar_url: string; login: string }
}

/* Context*/
export const AuthContext = createContext({} as AuthContextData)

// Provider
export const AuthProvider = (props: AuthProvider) => {
  const userId = "3f3bb88bf0b525855c51"

  const signInUrl = `https:github.com/login/oauth/authorize?scope=user&client_id=${userId}&redirect_url=http:localhost:3000`

  // State
  const [user, setUser] = useState<User | null>(null)

  // Get the GitHub code when clicked to signin with GitHub
  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes("?code=")

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("/?code=")
      console.log({ urlWithoutCode, githubCode })
      // it won't display the url with code
      window.history.pushState({}, "", urlWithoutCode)

      signin(githubCode)
    }
  }, [])

  const signin = async (githubCode: string) => {
    const response = await api.post<Authresponse>("authenticate", {
      code: githubCode,
    })
    const { token, user } = response.data
    // Storage the user data setting the token
    localStorage.setItem("@dowhile:token", token)
    console.log("Token: ", token)
    setUser(user)
  }

  // Gets the Toke after sign in
  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token")

    if (token) {
      // Get the user token from the header
      api.defaults.headers.common.authorization = `Bearer ${token}`
      // Set the user profile, keeping this one online
      api.get<User>("profile").then((response) => setUser(response.data))
    }
  }, [])

  const signOut = () => {
    // Return the user to null
    setUser(null)
    // Remove the user token from the storage
    localStorage.removeItem("@dowhile:token")
  }

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}
