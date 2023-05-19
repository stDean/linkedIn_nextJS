import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { AnimatePresence } from "framer-motion";

import { Feed, Header, Modal, Sidebar } from "@/components";
import { modalState, modalTypeState } from "@/atoms/modalAtom";

export default function Home() {

  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/landin");
    },
  });
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

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
          <Feed />
        </div>

        {/* Widgets */}

        <AnimatePresence>
          {
            modalOpen && (
              <Modal handleClose={() => setModalOpen(false)} type={modalType} />
            )
          }
        </AnimatePresence>
      </main>
    </div>
  )
}

// this id to get the session data 
export async function getServerSideProps(context) {
  // check if user is authenticated on the server
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