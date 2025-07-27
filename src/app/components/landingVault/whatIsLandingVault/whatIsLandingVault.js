"use client"

import styles from "./whatIsLandingVault.module.scss";
import { useRef, useEffect } from "react";

export default function WhatIsLendingVault() {
    return (
    <div className={styles.WhatIsLendingVault}>
      <div className={`${styles.WhatIsLendingVaultWrapper} container`}>
        <div className={styles.emptyGradiantLine}></div>
        <h6 className={styles.subHead}>What is</h6>
        <h1 className={styles.mainHead}>Lending Vault</h1>
        <div className={styles.emptyGradiantLine}></div>
        <div className={styles.content}>
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
        </div>
      </div>
    </div>
  );
}
