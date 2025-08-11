"use client";

import styles from "./slateProtocolIncome.module.scss";
import { useState, useEffect, useMemo } from "react";
import { useRive } from "@rive-app/react-canvas";
import Image from "next/image";

export default function SlateProtocolIncome() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const timelines = [
    { artboard: "repayment", animation: "Eth repayment", duration: 50000 },
  ];

  const [current, setCurrent] = useState(0);

  const riveProps = useMemo(() => {
    return {
      src: "/riv/wsteth_repay.riv",
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
    <div className={styles.slateProtocolIncome}>
      <div className={`${styles.slateProtocolIncomeHeader} container`}>
        <Image src="/slateProtocollogo.svg" width={274} height={40} alt="slateProtocollogo" />
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
          <RiveComponent
            key={`${timelines[current].artboard}-${timelines[current].animation}`}
          />
        </div>
      </div>
    </div>
  );
}
