import { signOut } from "next-auth/react";
import Head from "next/head";

import { Header } from "@/components";

export default function Home() {
  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favi.png" />
      </Head>

      <Header />
    </div>
  )
}
