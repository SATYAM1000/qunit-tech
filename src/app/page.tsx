"use client"
import Image from "next/image";
// import { getServerSession } from "next-auth";
// import { authoption } from "./api/auth/[...nextauth]/route";
import Cookies from "js-cookie";
import { useSession, signOut } from "next-auth/react"
import { useEffect } from "react";
export default function Home() {
  // const server = await getServerSession(authoption)
  const { data: session } = useSession();
  useEffect(() => {

    if (session && session?.user) {
      Cookies.set('token', session?.user?.jwt_token)

    }

  }, [session])
  return (
    <>
      <main className="min-h-screen  pt-16 dark:bg-gray-600">
        <div>Learing</div>
        {session?.user?.name}
        <br />
        {session?.user?.email}
        <br />
        {session?.user?.image}
        <br />
        {session?.user?.jwt_token}
        <br />
        {/* <Image src={session?.user?.image} width={100} height={100}/> */}
        {session?.user?.id}
        <br />



        <img src={session?.user?.image!} alt="" />



        <button className="bg-blue-400 " onClick={signOut}> Sigout</button>
      </main>
    </>
  );
}
