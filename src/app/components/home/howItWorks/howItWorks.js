"use client";

import styles from "./howItWorks.module.scss";
import { useState, useEffect, useMemo } from "react";
import { useRive } from "@rive-app/react-canvas";

export default function HowItWorks() {
  const [tab, setTab] = useState("borrow");
  const [activeStep, setActiveStep] = useState(0);
  const [creatingVaultIndex, setCreatingVaultIndex] = useState(0);
  const [liquidationIndex, setLiquidationIndex] = useState(0);
  const [depositIndex, setDepositIndex] = useState(0);
  const [earnIndex, setEarnIndex] = useState(0);
  const [activeInnerButtonMap, setActiveInnerButtonMap] = useState({ borrow: 0 });

  const stepsBorrow = [
    { title: "Creating a Vault", number: "01" },
    { title: "Managing a Vault", number: "02" },
    { title: "Liquidation", number: "03" },
  ];

  const stepsEarn = [
    { title: "Deposit JUSD", number: "01" },
    { title: "Earn Returns", number: "02" },
    { title: "Withdraw Anytime", number: "03" },
  ];

  const steps = tab === "borrow" ? stepsBorrow : stepsEarn;
  const currentStep = steps[activeStep]?.title;


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const timelines = useMemo(() => {
    if (tab === "borrow") {
      if (currentStep === "Creating a Vault") {
        return [
          { artboard: "creating_vault", animation: "creating_vault_1", duration: 4000 },
          { artboard: "creating_vault", animation: "creating_vault_2", duration: 3000 },
          { artboard: "creating_vault", animation: "creating_vault_3", duration: 3000 },
        ];
      } else if (currentStep === "Liquidation") {
        return [
          { artboard: "creating_vault", animation: "liquidation_1", duration: 4000 },
          { artboard: "creating_vault", animation: "liquidation_2", duration: 3200 },
          { artboard: "creating_vault", animation: "liquidation_3", duration: 2800 },
          { artboard: "creating_vault", animation: "liquidation_4", duration: 1000 },
          { artboard: "creating_vault", animation: "liquidation_5", duration: 3500 },
          { artboard: "creating_vault", animation: "liquidation_6", duration: 1800 },
        ];
      } else if (currentStep === "Managing a Vault") {
        return [
          { artboard: "managing_vault", animation: "withdraw_jusd", duration: 5000 },
          { artboard: "managing_vault", animation: "withdraw_collateral", duration: 4000 },
          { artboard: "managing_vault", animation: "repay_jusd", duration: 3500 },
          { artboard: "managing_vault", animation: "add_collateral", duration: 3600 },
        ];
      }
      // } else if (tab === "earn") {
      //   if (currentStep === "Deposit JUSD") {
      //     return [
      //       { artboard: "deposit", animation: "deposit_1" },
      //       { artboard: "deposit", animation: "deposit_2" },
      //     ];
      //   } else if (currentStep === "Earn Returns") {
      //     return [
      //       { artboard: "earn_returns", animation: "earn_1" },
      //       { artboard: "earn_returns", animation: "earn_2" },
      //     ];
      //   }
    }
    return [{ artboard: "default", animation: "idle" }];
  }, [tab, currentStep]);


  const [current, setCurrent] = useState(0);

  const riveProps = useMemo(() => {
    return {
      src: "/riv/slate_lending_flow.riv",
      artboard: timelines[current]?.artboard,
      animations: timelines[current]?.animation,
      autoplay: true,
    };
  }, [timelines, current]);

  const { RiveComponent } = useRive(riveProps);

  useEffect(() => {
    setCurrent(0);
  }, [tab, activeStep]);

  useEffect(() => {
    setCreatingVaultIndex(0);
    setLiquidationIndex(0);
    setDepositIndex(0);
    setEarnIndex(0);
    if (tab !== "borrow") {
      setActiveInnerButtonMap((prev) => ({ ...prev, borrow: 0 }));
    }
  }, [tab]);

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
                      disabled={current === 0}
                      onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
                    />

                    <ArrowButton
                      direction="next"
                      disabled={current >= timelines.length - 1}
                      onClick={() => setCurrent((prev) => Math.min(prev + 1, timelines.length - 1))}
                    />


                  </>
                )}
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
        </div>
      </div>
    </div>
  );
}
