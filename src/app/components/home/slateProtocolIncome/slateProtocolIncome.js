"use client";

import styles from "./slateProtocolIncome.module.scss";
import { useState, useEffect, useRef } from "react";
import { useRive } from "@rive-app/react-canvas";
import Image from "next/image";

export default function SlateProtocolIncome() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const timelines = [
    { artboard: "repayment", animation: "Eth repayment", duration: 50000 },
  ];

  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const wasVisibleRef = useRef(false);

  // Observe section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible && !wasVisibleRef.current) {
          setCurrent(0); // restart animation
        }
        wasVisibleRef.current = nowVisible;
        setIsVisible(nowVisible);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Initialize Rive only once and control play/pause manually
  const { RiveComponent, rive } = useRive({
    src: "/riv/wsteth_repay.riv",
    artboard: timelines[0].artboard,
    animations: timelines[0].animation,
    autoplay: false, // we'll control start
  });

  // Play when visible, stop when not
  useEffect(() => {
    if (rive) {
      if (isVisible) {
        rive.reset();
        rive.play();
      } else {
        rive.pause();
      }
    }
  }, [isVisible, rive]);

  // Switch animations only when visible
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % timelines.length);
      if (rive) {
        rive.play(timelines[(current + 1) % timelines.length].animation);
      }
    }, timelines[current].duration);
    return () => clearTimeout(timer);
  }, [isVisible, current, rive, timelines]);

  return (
    <div className={styles.slateProtocolIncome} ref={sectionRef}>
      <div className={`${styles.slateProtocolIncomeHeader} container`}>
        <Image
          src="/slateProtocollogo.svg"
          width={274}
          height={40}
          alt="slateProtocollogo"
        />
        <h6 className={styles.incomeTxt}>Income</h6>
      </div>
      <div className={`${styles.slateProtocolIncomeWrap} container`}>
        <div
          style={{
            width: "600px",
            height: "600px",
            maxWidth: "100%",
            margin: "0 auto",
          }}
        >
          <RiveComponent />
        </div>
      </div>
    </div>
  );
}
