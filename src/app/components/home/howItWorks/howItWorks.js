"use client";

import styles from "./howItWorks.module.scss";
import { useState, useRef, useEffect } from "react";

const creatingVaultVideos = [
  "/borrow/creating_vault_1.mp4",
  "/borrow/creating_vault_2.mp4",
  "/borrow/creating_vault_3.mp4",
];

const liquidationVideos = [
  "/borrow/liquidation_1.mp4",
  "/borrow/liquidation_2.mp4",
  "/borrow/liquidation_3.mp4",
  "/borrow/liquidation_4.mp4",
  "/borrow/liquidation_5.mp4",
  "/borrow/liquidation_6.mp4",
];

const manageVaultVideos = [
  "/borrow/withdraw_jusd.mp4",
  "/borrow/withdraw_collateral.mp4",
  "/borrow/repay_jusd.mp4",
  "/borrow/add_collateral.mp4",
];

const depositJusdVideos = [
  "/earning/investing_1.mp4",
  "/earning/investing_2.mp4"
];

const earnReturnVideos = [
  "/earning/liquidation_1.mp4",
  "/earning/liquidation_2.mp4"
];

const withdrawnVideos = [
  "/earning/liquidation_3.mp4"
];


export default function HowItWorks() {
  const [tab, setTab] = useState("borrow");
  const [activeStep, setActiveStep] = useState(0);
  const [creatingVaultIndex, setCreatingVaultIndex] = useState(0);
  const [liquidationIndex, setLiquidationIndex] = useState(0);
  const [depositIndex, setDepositIndex] = useState(0);
  const [earnIndex, setEarnIndex] = useState(0);
  const [activeInnerButtonMap, setActiveInnerButtonMap] = useState({ borrow: 0 });
  const videoRef = useRef(null);

  const stepsBorrow = [
    { title: "Creating a Vault", number: "01", video: creatingVaultVideos[0] },
    { title: "Managing a Vault", number: "02", video: manageVaultVideos[0] },
    { title: "Liquidation", number: "03", video: liquidationVideos[0] },
  ];

  const stepsEarn = [
    { title: "Deposit JUSD", number: "01", video: depositJusdVideos[0] },
    { title: "Earn Returns", number: "02", video: earnReturnVideos[0] },
    { title: "Withdraw Anytime", number: "03", video: withdrawnVideos[0] },
  ];

  const steps = tab === "borrow" ? stepsBorrow : stepsEarn;
  const currentStep = steps[activeStep]?.title;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => { });
    }
  }, [tab, activeStep, creatingVaultIndex, liquidationIndex, activeInnerButtonMap]);

  useEffect(() => {
    setCreatingVaultIndex(0);
    setLiquidationIndex(0);
    setDepositIndex(0);
    setEarnIndex(0);
    if (tab !== "borrow") {
      setActiveInnerButtonMap((prev) => ({ ...prev, borrow: 0 }));
    }
  }, [tab]);

  const displayVideo = (() => {
    if (tab === "borrow") {
      if (currentStep === "Creating a Vault") return creatingVaultVideos[creatingVaultIndex];
      if (currentStep === "Managing a Vault") return manageVaultVideos[activeInnerButtonMap.borrow ?? 0];
      if (currentStep === "Liquidation") return liquidationVideos[liquidationIndex];
    } else {
      if (currentStep === "Deposit JUSD") return depositJusdVideos[depositIndex];
      if (currentStep === "Earn Returns") return earnReturnVideos[earnIndex];
      if (currentStep === "Withdraw Anytime") return withdrawnVideos[0];
    }
    return steps[activeStep]?.video;
  })();

  const ArrowButton = ({ direction, disabled, onClick }) => (
    <div
      className={`${direction === "prev" ? styles.arrowIconPrev : styles.arrowIconNext} ${disabled ? styles.disabled : ""}`}
      onClick={disabled ? undefined : onClick}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d={
            direction === "prev"
              ? "M11.1631 6.20391C11.5497 6.20391 11.8631 5.89051 11.8631 5.50391C11.8631 5.11731 11.5497 4.80391 11.1631 4.80391L11.1631 6.20391ZM1.09194 5.00893C0.818572 5.2823 0.818572 5.72551 1.09194 5.99888L5.54671 10.4537C5.82008 10.727 6.26329 10.727 6.53666 10.4537C6.81003 10.1803 6.81003 9.73707 6.53666 9.4637L2.57686 5.50391L6.53666 1.54411C6.81003 1.27074 6.81003 0.827526 6.53666 0.554159C6.26329 0.280792 5.82008 0.280792 5.54671 0.554159L1.09194 5.00893ZM11.1631 5.50391L11.1631 4.80391L1.58691 4.80391L1.58691 5.50391L1.58691 6.20391L11.1631 6.20391L11.1631 5.50391Z"
              : "M1.28613 6.20391C0.899533 6.20391 0.586133 5.89051 0.586133 5.50391C0.586133 5.11731 0.899534 4.80391 1.28613 4.80391L1.28613 6.20391ZM11.3573 5.00893C11.6306 5.2823 11.6306 5.72551 11.3573 5.99888L6.90251 10.4537C6.62914 10.727 6.18592 10.727 5.91256 10.4537C5.63919 10.1803 5.63919 9.73707 5.91256 9.4637L9.87236 5.50391L5.91256 1.54411C5.63919 1.27074 5.63919 0.827526 5.91256 0.554159C6.18592 0.280792 6.62914 0.280792 6.90251 0.554159L11.3573 5.00893ZM1.28613 5.50391L1.28613 4.80391L10.8623 4.80391L10.8623 5.50391L10.8623 6.20391L1.28613 6.20391L1.28613 5.50391Z"
          }
          fill="#606060"
        />
      </svg>
    </div>
  );

  return (
    <div className={styles.howItWorks}>
      <div className={`${styles.howItWorksWrapper} container`}>
        <h2 className={styles.mainHead}>How Slate Protocol Works</h2>

        {/* Tab Switcher */}
        <div className={styles.tabSwitcherBox}>
          <div className={styles.tabSwitcher}>
            {["borrow", "earn"].map((type) => (
              <button
                key={type}
                className={tab === type ? styles.activeTab : styles.inactiveTab}
                onClick={() => setTab(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Step + Video Section */}
        <div className={styles.contentRow}>
          <div className={styles.leftCol}>
            {steps.map((step, idx) => (
              <div key={idx} className={styles.stepBox}>
                <h2
                  className={`${styles.stepTitle} ${activeStep === idx ? styles.activeStep : ""}`}
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
                        onClick={() => setActiveInnerButtonMap((prev) => ({ ...prev, borrow: i }))}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column - Video & Arrows */}
          <div className={styles.rightCol}>
            <div className={styles.illustration}>
              {(
                (tab === "borrow" && (currentStep === "Creating a Vault" || currentStep === "Liquidation")) ||
                (tab === "earn" && (currentStep === "Deposit JUSD" || currentStep === "Earn Returns"))
              ) && (
                  <>
                    <ArrowButton
                      direction="prev"
                      disabled={
                        currentStep === "Creating a Vault"
                          ? creatingVaultIndex === 0
                          : currentStep === "Liquidation"
                            ? liquidationIndex === 0
                            : currentStep === "Deposit JUSD"
                              ? depositIndex === 0
                              : currentStep === "Earn Returns"
                                ? earnIndex === 0
                                : true
                      }
                      onClick={() => {
                        if (currentStep === "Creating a Vault") setCreatingVaultIndex((i) => i - 1);
                        else if (currentStep === "Liquidation") setLiquidationIndex((i) => i - 1);
                        else if (currentStep === "Deposit JUSD") setDepositIndex((i) => i - 1);
                        else if (currentStep === "Earn Returns") setEarnIndex((i) => i - 1);
                      }}
                    />

                    <ArrowButton
                      direction="next"
                      disabled={
                        currentStep === "Creating a Vault"
                          ? creatingVaultIndex === creatingVaultVideos.length - 1
                          : currentStep === "Liquidation"
                            ? liquidationIndex === liquidationVideos.length - 1
                            : currentStep === "Deposit JUSD"
                              ? depositIndex === depositJusdVideos.length - 1
                              : currentStep === "Earn Returns"
                                ? earnIndex === earnReturnVideos.length - 1
                                : true
                      }
                      onClick={() => {
                        if (currentStep === "Creating a Vault") setCreatingVaultIndex((i) => i + 1);
                        else if (currentStep === "Liquidation") setLiquidationIndex((i) => i + 1);
                        else if (currentStep === "Deposit JUSD") setDepositIndex((i) => i + 1);
                        else if (currentStep === "Earn Returns") setEarnIndex((i) => i + 1);
                      }}
                    />

                  </>
                )}

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
        
        <div className={styles.stabilityFund}>
          <div className={styles.leftContent}>
            <h5 className={styles.subHead}>What is</h5>
            <h2 className={styles.mainHead}>Stability Fund</h2>
          </div>
          <div className={styles.rightContent}>
            <p className={styles.description}>
              The Stability Fund provides uncorrelated returns that increase during market downturns. When StETH prices fall, more Lending Vaults become eligible for liquidation.  The Stability Fund purchases this collateral at a 10% discount to market value. This counter-cyclical approach helps protect against drawdowns and delivers higher returns during market stress.
            </p>
          </div>
        </div>
        <div className={styles.hiwSec}>
          <div className={styles.leftSec}>
              <h5 className={styles.innerHead}>How It Works</h5>
              <ul className={styles.hiwList}>
                <li className={styles.hiwItem}>
                  <span className={styles.hiwItemNumber}>1.</span>
                  <p className={styles.hiwItemDescription}>Users deposit JUSD stablecoin into the Stability Fund</p>
                </li>
                <li className={styles.hiwItem}>
                  <span className={styles.hiwItemNumber}>2.</span>
                  <p className={styles.hiwItemDescription}>When a Lending Vault falls below 120% collateralization ratio</p>
                </li>
                <li className={styles.hiwItem}>
                  <span className={styles.hiwItemNumber}>3.</span>
                  <p className={styles.hiwItemDescription}>Users deposit JUSD stablecoin into the Stability Fund</p>
                </li>
                <li className={styles.hiwItem}>
                  <span className={styles.hiwItemNumber}>4.</span>
                  <p className={styles.hiwItemDescription}>When a Lending Vault falls below 120% collateralization ratio</p>
                </li>
                <li className={styles.hiwItem}>
                  <span className={styles.hiwItemNumber}>5.</span>
                  <p className={styles.hiwItemDescription}>Users deposit JUSD stablecoin into the Stability Fund</p>
                </li>
              </ul>
          </div>
          <div className={styles.rightSec}>
            <h2 className={styles.innerHead}>Key Benefits</h2>
            <div className={styles.benefitList}>
                <div className={styles.benefitItem}>
                    <img src="/benefit-1.svg" alt="Benefit 1" className={styles.benefitImage} />
                    <span className={styles.benefitCount}>( 01 )</span>
                    <p className={styles.benefitDescription}>Truly uncorrelated returns with no historical drawdowns</p>
                </div>
                <div className={styles.benefitItem}>
                    <img src="/benefit-2.svg" alt="Benefit 2" className={styles.benefitImage} />
                    <span className={styles.benefitCount}>( 02 )</span>
                    <p className={styles.benefitDescription}>Returns increase during market volatility and downturns</p>
                </div>
                 <div className={styles.benefitItem}>
                    <img src="/benefit-3.svg" alt="Benefit 3" className={styles.benefitImage} />
                    <span className={styles.benefitCount}>( 03 )</span>
                    <p className={styles.benefitDescription}>Seizes StETH at a 10% discount during liquidations</p>
                </div>
                 <div className={styles.benefitItem}>
                    <img src="/benefit-4.svg" alt="Benefit 4" className={styles.benefitImage} />
                    <span className={styles.benefitCount}>( 04 )</span>
                    <p className={styles.benefitDescription}>Automatic liquidation process requires no manual trading</p>
                </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  );
}
