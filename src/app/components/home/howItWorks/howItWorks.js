"use client";

import styles from "./howItWorks.module.scss";
import { useState, useRef, useEffect } from "react";

export default function HowItWorks() {
  const [tab, setTab] = useState("borrow");
  const [activeStep, setActiveStep] = useState(0);
  const videoRef = useRef(null);

  const stepsBorrow = [
    {
      title: "Creating a Vault",
      number: "01",
      video: "/lendingvideos/creating_vault (1).mp4",
    },
    {
      title: "Managing a Vault",
      number: "02",
      video: "/lendingvideos/withdraw_jusd.mp4",
    },
    {
      title: "Liquidation",
      number: "03",
      video: "/lendingvideos/liquidation.mp4",
    },
  ];

  const stepsEarn = [
    {
      title: "Deposit JUSD",
      number: "01",
      video: "/earningvideo/investing (1).mp4",
    },
    {
      title: "Earn Returns",
      number: "02",
      video: "/earningvideo/liquidation (2).mp4",
    },
    {
      title: "Withdraw Anytime",
      number: "03",
      video: "/earningvideo/investing (1).mp4",
    },
  ];

  const steps = tab === "borrow" ? stepsBorrow : stepsEarn;
  const currentVideo = steps[activeStep]?.video;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideo]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setActiveStep(0);
  };

  // State for inner buttons under "Managing a Vault"
  const [activeInnerButtonMap, setActiveInnerButtonMap] = useState({ borrow: 0 });

  // Videos for inner buttons under "Managing a Vault"
  const manageVaultVideos = [
    "/lendingvideos/withdraw_jusd.mp4",
    "/lendingvideos/withdraw_collateral.mp4",
    "/lendingvideos/repay_jusd.mp4",
    "/lendingvideos/add_collateral.mp4",
  ];

  // Determine which video to show
  let displayVideo = currentVideo;
  if (
    tab === "borrow" &&
    steps[activeStep]?.title === "Managing a Vault"
  ) {
    displayVideo = manageVaultVideos[activeInnerButtonMap.borrow ?? 0];
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [displayVideo]);

  const handleInnerButtonClick = (i) => {
    setActiveInnerButtonMap((prev) => ({ ...prev, borrow: i }));
  };

  useEffect(() => {
    // Do not reset inner button when switching steps
    // Only reset when switching tab
    if (tab !== "borrow") {
      setActiveInnerButtonMap((prev) => ({ ...prev, borrow: 0 }));
    }
  }, [tab]);

  return (
    <div className={styles.howItWorks}>
      <div className={`${styles.howItWorksWrapper} container`}>
        <h2 className={styles.mainHead}>How Slate Protocol Works</h2>

        {/* Tab Switcher */}
        <div className={styles.tabSwitcherBox}>
          <div className={styles.tabSwitcher}>
            <button
              className={tab === "borrow" ? styles.activeTab : styles.inactiveTab}
              onClick={() => handleTabChange("borrow")}
            >
              Borrow
            </button>
            <button
              className={tab === "earn" ? styles.activeTab : styles.inactiveTab}
              onClick={() => handleTabChange("earn")}
            >
              Earn
            </button>
          </div>
        </div>

        {/* Step + Video Section */}
        <div className={styles.contentRow}>
          <div className={styles.leftCol}>
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={styles.stepBox}
              >
                <h2
                  className={`${styles.stepTitle}${activeStep === idx ? ` ${styles.activeStep}` : ""}`}
                  onClick={() => setActiveStep(idx)}
                >
                  {step.title}
                  <span className={styles.stepNumber}>({step.number})</span>
                </h2>
                {tab === "borrow" && step.title === "Managing a Vault" && activeStep === idx && (
                  <div className={styles.innerButtons}>
                    {["Withdraw JUSD", "Withdraw Collateral", "Repay JUSD", "Add Collateral"].map((label, i) => (
                      <button
                        key={label}
                        className={`${styles.actionItem} ${activeInnerButtonMap.borrow === i ? styles.active : ""}`}
                        onClick={() => handleInnerButtonClick(i)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.rightCol}>
            <div className={styles.illustration}>
              <video
                key={displayVideo}
                ref={videoRef}
                src={displayVideo}
                autoPlay
                muted
                className={styles.videoPlayer}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
