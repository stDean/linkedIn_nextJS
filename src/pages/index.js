import { signOut } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  return (
    <div className="space-y-10 relative">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favi.png" />
      </Head>

      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
