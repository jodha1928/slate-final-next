"use client";

import styles from "./banner.module.scss";
import { useState, useEffect } from "react";
import { useRive } from "@rive-app/react-canvas";

export default function Banner() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const timelines = ["portfolio", "deposit", "liquidate"];
  const [current, setCurrent] = useState(0);

  const { rive, RiveComponent } = useRive({
    src: "/riv/hero.riv",
    artboard: "hero", // fixed artboard
    animations: timelines[0], // initial animation
    autoplay: true,
  });

  // Switch animation on same artboard without re-render
  useEffect(() => {
    const timer = setTimeout(() => {
      const next = (current + 1) % timelines.length;
      setCurrent(next);
      if (rive) {
        rive.play(timelines[next]); // play next timeline
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [current, rive, timelines]);

  return (
    <div className={styles.banner}>
      <div className={`${styles.bannerWrapper} container`}>
        <h1 className={styles.mainHead}>
          Low-Cost <br /> Borrowing
        </h1>
        <p className={styles.subHead}>
          Deposit JUSD into the Stability Fund to
          <br />
          earn returns
        </p>
        <div
          style={{
            width: "400px",
            height: "400px",
            maxWidth: "100%",
            margin: "0 auto",
          }}
        >
          <RiveComponent /> {/* No key, no remount */}
        </div>
      </div>
    </div>
  );
}
