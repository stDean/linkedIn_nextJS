import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { AnimatePresence } from "framer-motion";

import { Feed, Header, Modal, Sidebar, Widget } from "@/components";
import { modalState, modalTypeState } from "@/atoms/modalAtom";
import { connectToDatabase } from "@/utils/mongodb";

export default function Home({ posts, articles }) {

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
    <main className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favi.png" />
      </Head>

      <Header />

      <div className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          <Feed posts={posts} />
        </div>

        <Widget articles={articles} />

        <AnimatePresence>
          {
            modalOpen && (
              <Modal handleClose={() => setModalOpen(false)} type={modalType} />
            )
          }
        </AnimatePresence>
      </div>
    </main>
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

  // Get posts on SSR
  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .find()
    .sort({ timestamp: -1 })
    .toArray();

  // Get Google News API
  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  ).then(res => {
    if (res.ok) {
      return res.json()
    }
  });

  return {
    props: {
      session,
      posts: posts.map(post => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt,
      })),
      articles: results.articles,
    }
  }
}