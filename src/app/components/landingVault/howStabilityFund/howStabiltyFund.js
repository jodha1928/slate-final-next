"use client"

import styles from "./howStabiltyFund.module.scss";
import { useRef, useEffect } from "react";

export default function HowStabilityFund() {
    return (
    <div className={styles.HowStabilityFund}>
      <div className={`${styles.HowStabilityFundWrapper} container`}>
        <div className={styles.mainHeadContent}>
            <h2 className={styles.mainHead}>How  Stability Fund Makes<br /> Money for you</h2>
            <p className={styles.description}>The Stability Fund purchases this collateral at a<br /> 10% discount to market value. </p>
        </div>
        {/* <div className={styles.content}>
            <div className={styles.innerContent}>
                <div className={styles.text}>
                    <h2 className={styles.title}>
                        The <span className={styles.highlight}>Stability Fund provides</span> <i className={styles.italic}>uncorrelated</i> returns that increase during market downturns.
                    </h2>
                    <p className={styles.description}>
                        When StETH prices fall, more Lending Vaults become eligible for liquidation. The Stability Fund purchases this collateral at a 10% discount to market value. This counter-cyclical approach helps protect against drawdowns and delivers higher returns during market stress.
                    </p>
                    <p className={styles.description}>
                        The Stability Fund purchases this collateral at a 10% discount to market value. This counter-cyclical approach helps protect against drawdowns and delivers higher returns during market stress.
                    </p>
                </div>
                <div className={styles.image}>
                    <video
                        src="/home-banner-1.mp4"
                        autoPlay
                        muted
                        playsInline
                        loop={false}
                        controls={false}
                        style={{ width: "400px", height: "auto" }}
                    />
                </div>
            </div>
        </div> */}
      </div>
    </div>
  );
}
