import Head from "next/head";
import Image from "next/image";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import { HeaderLink } from "@/components";

export default function Home() {
  return (
    <>
      <Head>
        <title>LinkedIn</title>
        <link rel="icon" href="/favi.png" />
      </Head>

      <header className="flex justify-around items-center py-4">
        {/* any child that has fill prop used must have parent of relative with width and height */}
        <div className="relative w-36 h-10">
          <Image src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg" fill object-fit="contain" />
        </div>

        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4" >
            <HeaderLink Icon={ExploreIcon} text="Discover" />
            <HeaderLink Icon={GroupIcon} text="People" />
            <HeaderLink Icon={OndemandVideoSharpIcon} text="Learning" />
            <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
          </div>

          <div className="pl-4">
            <button
              className="text-blue-700 font-semibold border border-blue-700 rounded-full px-5 py-1.5 transition-all hover:border-2"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col xl:flex-row items-center max-w-screen-xl mx-auto">
        <div className="space-y-6 xl:space-y-16">
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

        <div className="relative xl:absolute w-96 h-96 lg:w-[650px] lg:h-[650px] xl:w-[750px] xl:h-[650px] top-14 right-5">
          <Image src="land.svg" fill />
        </div>
      </main>
    </>
  )
}
