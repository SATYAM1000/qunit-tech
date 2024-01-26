import { cookies } from "next/headers"

export const getCookie = () => {
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    console.log(token);
    return token
}