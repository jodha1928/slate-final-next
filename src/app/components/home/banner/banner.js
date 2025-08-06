"use client";

import styles from "./banner.module.scss";
import { useState, useEffect, useMemo } from "react";
import { useRive } from "@rive-app/react-canvas";

export default function Banner() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const timelines = [
    { artboard: "hero", animation: "deposit", duration: 6000 },
    { artboard: "liquidate", animation: "liquidate", duration: 12000 },
  ];

  const [current, setCurrent] = useState(0);

  const riveProps = useMemo(() => {
    return {
      src: "/riv/hero.riv",
      artboard: timelines[current].artboard,
      animations: timelines[current].animation,
      autoplay: true,
    };
  }, [current, timelines]);

  const { RiveComponent } = useRive(riveProps);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % timelines.length);
    }, timelines[current].duration);

    return () => clearTimeout(timer);
  }, [current, timelines]);

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
          <RiveComponent
            key={`${timelines[current].artboard}-${timelines[current].animation}`}
          />
        </div>
      </div>
    </div>
  );
}
