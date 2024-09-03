import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const CustomSpinner = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.asPath) setLoading(true);
    };

    const handleComplete = (url) => {
      setTimeout(() => setLoading(false), 500);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  });

  return (
    loading && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-background bg-opacity-90">
        <DotLottiePlayer
          src="https://lottie.host/5c91e397-b4ee-4981-85d4-ef64fcfef190/nlMPxJAKgb.lottie"
          autoplay
          loop
        ></DotLottiePlayer>
      </div>
    )
  );
};

export default CustomSpinner;
