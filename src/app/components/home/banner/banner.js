"use client"

import styles from "./banner.module.scss";
import { useState, useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

export default function Banner() {
  const timelines = [
    { artboard: "hero", animation: "portfolio" },
    { artboard: "hero", animation: "deposit" },
    { artboard: "liquidate", animation: "liquidate" },
  ];

  const [current, setCurrent] = useState(0);

  const { rive, RiveComponent } = useRive({
    src: "/riv/hero.riv",
    artboard: timelines[current].artboard,
    animations: timelines[current].animation,
    autoplay: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = (current + 1) % timelines.length;
      setCurrent(next);
    }, 2000);
    return () => clearTimeout(timer);
  }, [current, timelines.length]);

  return (
    <div className={styles.banner}>
      <div className={`${styles.bannerWrapper} container`}>
        <h1 className={styles.mainHead}>Low-Cost <br /> Borrowing</h1>
        <p className={styles.subHead}>Deposit JUSD into the Stability Fund to<br /> earn returns</p>
        <div style={{ width: "400px", height: "400px", maxWidth: "100%", margin: "0 auto" }}>
          <RiveComponent key={`${timelines[current].artboard}-${timelines[current].animation}`} />
        </div>
      </div>
    </div>
  );
}
