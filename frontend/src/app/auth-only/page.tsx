"use client"
import { useSignOut, useAuthUser, useAuthHeader } from "react-auth-kit"
import { useRouter } from "next/navigation"

const Page = () => {
  const auth = useAuthUser()
  const authHeader = useAuthHeader()

  console.log(auth()?.username)
  console.log(authHeader())

  const signOut = useSignOut()
  const route = useRouter()

  const logout = () => {
    signOut()
    route.push("/login")
  }

  return (
    <>
      <h1>Auth Only</h1>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default Page
