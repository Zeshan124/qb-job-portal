"use client";

import dynamic from "next/dynamic";
import animationData from "@/public/animations/Animation.json";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function LottieAnimation() {
  return (
    <Player
      autoplay
      loop
      src={animationData}
      className="lottie"
      keepLastFrame
    />
  );
}
