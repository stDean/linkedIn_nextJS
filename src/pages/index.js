import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Header, Sidebar } from "@/components";

export default function Home() {

  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/landin");
    },
  });

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favi.png" />
      </Head>

      <Header />

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />

          {/* Main Feed */}
        </div>

        {/* Widgets */}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      }
    }
  }

  return {
    props: {
      session
    }
  }
}