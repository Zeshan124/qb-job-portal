"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import animationData from "@/public/animations/Animation.json";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const Hero = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="pt-16 md:pt-20 pb-8 md:pb-12">
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 item-center gap-[2rem]">
          <div>
            <h1 className="text-[28px] sm:text-[35px] lg:text-[45px] xl:text-[60px] text-[#05264e] leading-normal lg:leading-relaxed font-extrabold">
              The <span className="text-[#8570C5]">Easiest Way</span> <br /> To
              Get Your Dream jobs
            </h1>
            <p className="text-[#4f5e6f] text-[16px] md:text-[18px] mt-[1rem]">
            Qist Bazaar is a prominent e-commerce platform based in Pakistan that offers a "Buy Now, Pay Later" (BNPL) service. It was established in 2021 with the aim of improving the standard of living for the average Pakistani by making a variety of products more accessible through affordable monthly installments.
            </p>
            {/* <div className="mt-[1.5rem]">
              <input
                className="w-[60%] md:w-[70%] lg:w-[75%] px-5 py-4 outline-none rounded-l-md bg-gray-200"
                placeholder="eg:Frontend developer"
                title="search box"
                type="text"
              />
              <button
                title="Press to Search"
                type="button"
                className="px-5 py-4 outline-none rounded-r-md bg-[#8570C5] text-white"
              >
                Search
              </button>
            </div> */}
          </div>
          <div className="hidden lg:block">
            {isClient && (
              <Player
                autoplay
                loop
                src={animationData}
                style={{ height: "570px", width: "700px" }}
                keepLastFrame
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
