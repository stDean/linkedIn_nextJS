import Head from "next/head";
import Image from "next/image";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { getProviders, signIn } from "next-auth/react";

import { HeaderLink } from "@/components";

export default function Home({ providers }) {
  // console.log(providers);
  return (
    <main className="space-y-10 relative">
      <Head>
        <title>LinkedIn</title>
        <link rel="icon" href="/favi.png" />
      </Head>

      <header className="flex justify-around items-center py-4">
        {/* any child that has fill prop used must have parent of relative with width and height */}
        <div className="relative w-36 h-10">
          <Image alt="logo" src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg" fill object-fit="contain" />
        </div>

        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4" >
            <HeaderLink Icon={ExploreIcon} text="Discover" />
            <HeaderLink Icon={GroupIcon} text="People" />
            <HeaderLink Icon={OndemandVideoSharpIcon} text="Learning" />
            <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
          </div>

          {
            Object.values(providers).map(provider => (
              <div key={provider.name}>
                <div className="pl-4">
                  <button
                    className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2"
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </header >

      <div className="flex flex-col xl:flex-row items-center max-w-screen-xl mx-auto">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4">
            Welcome to your professional community
          </h1>

          <div className="space-y-4 pl-4">
            <div className="intent">
              <h2 className="text-xl">Search for a job</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
          </div>
        </div>

        <div className="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-14 right-5">
          <Image src="land.svg" fill priority alt="side image" />
        </div>
      </div>
    </main>
  )
}

// this gets all the providers you have used with next-auth
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}