"use client"
import { SessionProvider } from "next-auth/react"
interface ChildrenType {
    children: React.ReactNode
}
const AuthProvider = ({ children }: ChildrenType) => {
    return <SessionProvider>{children}</SessionProvider>
}
export default AuthProvider;