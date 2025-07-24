"use client"

import styles from "./banner.module.scss";
import { useRef, useEffect } from "react";

export default function Banner() {
  const videoRef = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sources = ["/home-banner-1.mp4", "/home-banner-2.mp4"];
  const current = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => {
      current.current = (current.current + 1) % sources.length;
      video.src = sources[current.current];
      video.load();
      video.play();
    };
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [sources]);

  return (
    <div className={styles.banner}>
      <div className={`${styles.bannerWrapper} container`}>
        <h1 className={styles.mainHead}>Low-Cost <br /> Borrowing</h1>
        <p className={styles.subHead}>Deposit JUSD into the Stability Fund to<br /> earn returns</p>
        <video
          ref={videoRef}
          src={sources[0]}
          autoPlay
          muted
          playsInline
          loop={false}
          controls={false}
          style={{ width: "400px", height: "auto", marginBottom: "2rem" }}
        />
      </div>
    </div>
  );
}
