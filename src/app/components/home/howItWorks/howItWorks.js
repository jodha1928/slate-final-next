"use client";

import styles from "./howItWorks.module.scss";
import { useState, useRef, useEffect } from "react";

export default function HowItWorks() {
  const [tab, setTab] = useState("borrow");
  const [activeStep, setActiveStep] = useState(0);
  const videoRef = useRef(null);

  const creatingVaultVideos = [
    "/videos/creating_vault_1.mp4",
    "/videos/creating_vault_2.mp4",
    "/videos/creating_vault_3.mp4",
  ];
  const [creatingVaultIndex, setCreatingVaultIndex] = useState(0);

  const stepsBorrow = [
    {
      title: "Creating a Vault",
      number: "01",
      video: "/videos/creating_vault_1.mp4",
    },
    {
      title: "Managing a Vault",
      number: "02",
      video: "/videos/withdraw_jusd_1.mp4",
    },
    {
      title: "Liquidation",
      number: "03",
      video: "/videos/lending_liquidation_2.mp4",
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
      videoRef.current.play().catch(() => { });
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
    "/videos/withdraw_jusd_1.mp4",
    "/videos/withdraw_collateral_1.mp4",
    "/videos/repay_jusd_1.mp4",
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
      videoRef.current.play().catch(() => { });
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

  useEffect(() => {
    // Reset index when leaving "Creating a Vault"
    if (steps[activeStep]?.title !== "Creating a Vault") {
      setCreatingVaultIndex(0);
    }
  }, [activeStep, tab, steps]);

  // Optimize displayVideo assignment
  if (tab === "borrow" && steps[activeStep]?.title === "Creating a Vault") {
    displayVideo = creatingVaultVideos[creatingVaultIndex];
  } else if (tab === "borrow" && steps[activeStep]?.title === "Managing a Vault") {
    displayVideo = manageVaultVideos[activeInnerButtonMap.borrow ?? 0];
  }

  const handlePrevVaultVideo = () => {
    if (creatingVaultIndex > 0) setCreatingVaultIndex(creatingVaultIndex - 1);
  };
  const handleNextVaultVideo = () => {
    if (creatingVaultIndex < creatingVaultVideos.length - 1) setCreatingVaultIndex(creatingVaultIndex + 1);
  };


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
              {steps[activeStep]?.title === "Creating a Vault" && (
                <div
                  className={`${styles.arrowIconPrev} ${creatingVaultIndex === 0 ? styles.disabled : ""}`}
                  onClick={creatingVaultIndex === 0 ? undefined : handlePrevVaultVideo}
                  style={{ cursor: creatingVaultIndex === 0 ? "not-allowed" : "pointer" }}
                >
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.1631 6.20391C11.5497 6.20391 11.8631 5.89051 11.8631 5.50391C11.8631 5.11731 11.5497 4.80391 11.1631 4.80391L11.1631 6.20391ZM1.09194 5.00893C0.818572 5.2823 0.818572 5.72551 1.09194 5.99888L5.54671 10.4537C5.82008 10.727 6.26329 10.727 6.53666 10.4537C6.81003 10.1803 6.81003 9.73707 6.53666 9.4637L2.57686 5.50391L6.53666 1.54411C6.81003 1.27074 6.81003 0.827526 6.53666 0.554159C6.26329 0.280792 5.82008 0.280792 5.54671 0.554159L1.09194 5.00893ZM11.1631 5.50391L11.1631 4.80391L1.58691 4.80391L1.58691 5.50391L1.58691 6.20391L11.1631 6.20391L11.1631 5.50391Z" fill="#606060" />
                  </svg>
                </div>
              )}
              <video
                key={displayVideo}
                ref={videoRef}
                src={displayVideo}
                autoPlay
                muted
                className={styles.videoPlayer}
              />
              {steps[activeStep]?.title === "Creating a Vault" && (
                <div
                  className={`${styles.arrowIconNext} ${creatingVaultIndex === creatingVaultVideos.length - 1 ? styles.disabled : ""}`}
                  onClick={creatingVaultIndex === creatingVaultVideos.length - 1 ? undefined : handleNextVaultVideo}
                  style={{ cursor: creatingVaultIndex === creatingVaultVideos.length - 1 ? "not-allowed" : "pointer" }}
                >
                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.28613 6.20391C0.899533 6.20391 0.586133 5.89051 0.586133 5.50391C0.586133 5.11731 0.899534 4.80391 1.28613 4.80391L1.28613 6.20391ZM11.3573 5.00893C11.6306 5.2823 11.6306 5.72551 11.3573 5.99888L6.90251 10.4537C6.62914 10.727 6.18592 10.727 5.91256 10.4537C5.63919 10.1803 5.63919 9.73707 5.91256 9.4637L9.87236 5.50391L5.91256 1.54411C5.63919 1.27074 5.63919 0.827526 5.91256 0.554159C6.18592 0.280792 6.62914 0.280792 6.90251 0.554159L11.3573 5.00893ZM1.28613 5.50391L1.28613 4.80391L10.8623 4.80391L10.8623 5.50391L10.8623 6.20391L1.28613 6.20391L1.28613 5.50391Z" fill="#606060" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
