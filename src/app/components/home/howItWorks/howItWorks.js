"use client";

import styles from "./howItWorks.module.scss";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRive } from "@rive-app/react-canvas";
import CorrelationMatrix from "../../chart/CorrelationMatrix";
import OptimalAllocationTable from "../../chart/OptimalAllocationTable";
import FrontiersCalChart from "../../chart/Frontier chart";
import MultiLineChart from "../../chart/MultiLineChart";

export default function HowItWorks() {
  const [tab, setTab] = useState("borrow");
  const [activeStep, setActiveStep] = useState(0);
  const [activeInnerButtonMap, setActiveInnerButtonMap] = useState({ borrow: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const riveContainerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // initial run
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const timelines = useMemo(() => {
    if (tab === "borrow") {
      if (currentStep === "Creating a Vault") {
        return [
          { artboard: isMobile ? "creating_vault_mobile" : "creating_vault", animation: "creating_vault_1", duration: 4000 },
          { artboard: isMobile ? "creating_vault_mobile" : "creating_vault", animation: "creating_vault_2", duration: 3000 },
          { artboard: isMobile ? "creating_vault_mobile" : "creating_vault", animation: "creating_vault_3", duration: 3000 },
        ];
      } else if (currentStep === "Liquidation") {
        return [
          { artboard: isMobile ? "creating_vault_mobile" : "creating_vault", animation: "liquidation_1", duration: 4000 },
          { artboard: isMobile ? "creating_vault_mobile" : "creating_vault", animation: "liquidation_2", duration: 3200 },
          { artboard: isMobile ? "creating_vault_mobile" : "creating_vault", animation: "liquidation_3", duration: 2800 },
          { artboard: isMobile ? "creating_vault_mobile" : "creating_vault", animation: "liquidation_4", duration: 1000 },
          { artboard: isMobile ? "creating_vault_mobile" : "creating_vault", animation: "liquidation_5", duration: 4000 },
          { artboard: isMobile ? "creating_vault_mobile" : "creating_vault", animation: "liquidation_6", duration: 1800 },
        ];
      } else if (currentStep === "Managing a Vault") {
        const managingAnimations = [
          { artboard: isMobile ? "managing_vault_mobile" : "managing_vault", animation: "withdraw_jusd", duration: 5000 },
          { artboard: isMobile ? "managing_vault_mobile" : "managing_vault", animation: "withdraw_collateral", duration: 4000 },
          { artboard: isMobile ? "managing_vault_mobile" : "managing_vault", animation: "repay_jusd", duration: 4000 },
          { artboard: isMobile ? "managing_vault_mobile" : "managing_vault", animation: "add_collateral", duration: 3600 },
        ];
        return [managingAnimations[activeInnerButtonMap.borrow || 0]];
      }
    } else if (tab === "earn") {
      if (currentStep === "Deposit JUSD") {
        return [
          { artboard: isMobile ? "investingMobile" : "investing", animation: "investing_1", duration: 2500 },
          { artboard: isMobile ? "investingMobile" : "investing", animation: "investing_2", duration: 4000 },
        ];
      } else if (currentStep === "Earn Returns") {
        return [
          { artboard: isMobile ? "investingMobile" : "investing", animation: "liquidation_1", duration: 4000 },
          { artboard: isMobile ? "investingMobile" : "investing", animation: "liquidation_2", duration: 7500 },
        ];
      } else if (currentStep === "Withdraw Anytime") {
        return [
          { artboard: isMobile ? "investingMobile" : "investing", animation: "liquidation_3", duration: 4000 },
        ];
      }
    }
    return [{ artboard: "default", animation: "idle" }];
  }, [tab, currentStep, isMobile, activeInnerButtonMap.borrow]);

  const [current, setCurrent] = useState(0);

  const { rive, RiveComponent } = useRive({
    src: tab === "borrow" ? "/riv/slate_lending_flow.riv" : "/riv/slate_investing_flow.riv",
    artboard: timelines[0].artboard,
    animations: timelines[0].animation,
    autoplay: true,
    shouldDisableRiveListeners: true,
  });

  useEffect(() => {
  if (!rive || !riveContainerRef.current) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        rive.play(timelines[current]?.animation);
      } else {
        rive.pause();
      }
    },
    { threshold: 0.25 } // 25% visible before playing
  );

  observer.observe(riveContainerRef.current);

  return () => observer.disconnect();
}, [rive, timelines, current]);

 useEffect(() => {
  if (!rive) return;

  const { artboard, animation } = timelines[current] || {};
  if (!artboard || !animation) return;

  // Always reload the artboard fresh
  rive.load({
    src: tab === "borrow" ? "/riv/slate_lending_flow.riv" : "/riv/slate_investing_flow.riv",
    artboard,
    animations: animation,
    autoplay: true,
  });
}, [current, timelines, rive]);

  // Handle animation transitions smoothly
const handleAnimationChange = useCallback(
  (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (rive) rive.pause();

    setTimeout(() => {
      // Special case: Managing a Vault
      if (currentStep === "Managing a Vault") {
        if (direction === "next") {
          if (activeInnerButtonMap.borrow < 3) {
            setActiveInnerButtonMap((prev) => ({
              ...prev,
              borrow: prev.borrow + 1,
            }));
            setCurrent(0);
            setIsAnimating(false);
            if (rive) rive.play();
            return;
          } else {
            // last inner step → move to next main step
            if (activeStep < steps.length - 1) {
              setActiveStep((s) => s + 1);
              setActiveInnerButtonMap((prev) => ({ ...prev, borrow: 0 })); // reset inner
              setCurrent(0);
            }
          }
        } else if (direction === "prev") {
          if (activeInnerButtonMap.borrow > 0) {
            setActiveInnerButtonMap((prev) => ({
              ...prev,
              borrow: prev.borrow - 1,
            }));
            setCurrent(0);
            setIsAnimating(false);
            if (rive) rive.play();
            return;
          } else {
            // first inner step → go back to previous main step
            if (activeStep > 0) {
              setActiveStep((s) => s - 1);
              setCurrent(0);
            }
          }
        }
      }
      // Normal case (other steps)
      else {
        if (direction === "next") {
          if (current < timelines.length - 1) {
            setCurrent((c) => c + 1);
          } else if (activeStep < steps.length - 1) {
            setActiveStep((s) => s + 1);
            setCurrent(0);
          }
        } else if (direction === "prev") {
          if (current > 0) {
            setCurrent((c) => c - 1);
          } else if (activeStep > 0) {
            setActiveStep((s) => s - 1);
            setCurrent(0);
          }
        }
      }

      setTimeout(() => {
        if (rive) rive.play();
        setIsAnimating(false);
      }, 50);
    }, 50);
  },
  [
    rive,
    isAnimating,
    current,
    timelines.length,
    activeStep,
    steps.length,
    currentStep,
    activeInnerButtonMap.borrow,
  ]
);

  const isFirst =
  activeStep === 0 &&
  current === 0 &&
  !(currentStep === "Managing a Vault" && activeInnerButtonMap.borrow > 0);

const isLast =
  activeStep === steps.length - 1 &&
  current === timelines.length - 1 &&
  !(currentStep === "Managing a Vault" && activeInnerButtonMap.borrow < 3);

  useEffect(() => {
    setCurrent(0);
  }, [tab, activeStep]);

 useEffect(() => {
  if (tab === "borrow") {
    setActiveStep(0);
    setActiveInnerButtonMap((prev) => ({ ...prev, borrow: 0 }));
  } else if (tab === "earn") {
    setActiveStep(0); // "Deposit JUSD"
  }
  setCurrent(0); // also reset animation index
}, [tab]);

  const ArrowButton = useCallback(({ direction, disabled, onClick }) => (
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
  ), []);

  return (
    <div className={styles.howItWorks} id="hiw">
      <h2 className={styles.mainHead}>How Slate Protocol Works</h2>

        {/* Tab Switcher */}
        <div className={styles.tabSwitcherBox}>
          <div className={styles.tabSwitcher}>
            {["borrow", "earn"].map((type) => (
              <button
                key={type}
                className={tab === type ? styles.activeTab : styles.inactiveTab}
                onClick={() => {
                  setTab(type);
                  setCurrent(0);
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Step + Video Section */}
        <div className={styles.contentRow}>
          <div className={styles.innerContentRow}>
            <div className={styles.leftCol}>
              {steps.map((step, idx) => (
                <div key={idx} className={styles.stepBox}>
                  <h2
                    className={`${styles.stepTitle} ${activeStep === idx ? styles.activeStep : ""}`}
                    onClick={() => {
                      setActiveStep(idx);
                      setCurrent(0);
                    }}
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
                          onClick={() => {
                            setActiveInnerButtonMap((prev) => ({ ...prev, borrow: i }));
                            setCurrent(0);
                          }}
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
                  (tab === "borrow") ||
                  (tab === "earn")
                ) && (
                    <>
                      <ArrowButton
                        direction="prev"
                        disabled={isFirst}
                        onClick={() => handleAnimationChange('prev')}
                      />

                      <ArrowButton
                        direction="next"
                         disabled={isLast}
                        onClick={() => handleAnimationChange('next')}
                      />
                    </>
                  )}
                <div
                ref={riveContainerRef}
                  style={{
                    width: "100%",
                    height: isMobile ? "450px" : "500px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    opacity: isAnimating ? 0.7 : 1,
                    transition: 'opacity 0.1s ease',
                  }}
                >
                  {timelines[current] && (
                    <RiveComponent />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className={`${styles.howItWorksWrapper} container`}>
        {tab === "borrow" ?
          <div className={styles.lendingVaultSection} id="lanidngVault">
            <div className={styles.stabilityFund}>
              <div className={styles.leftContent}>
                {/* <h5 className={styles.subHead}>What is</h5> */}
                <h2 className={styles.mainHead}>
                  Low-Cost Borrowing with No Repayment Schedule
                </h2>
              </div>
              <div className={styles.rightContent}>
                <p className={styles.description}>
                  Borrow JUSD against your ETH or stETH at a fixed 1% annual interest rate keeping your staking rewards while accessing liquidity whenever you need it.
                </p>
              </div>
            </div>
            <div className={styles.hiwSec}>
              <div className={styles.leftSec}>
                <h5 className={styles.innerHead}>
                  How Borrowing Works
                </h5>
                <ul className={styles.hiwList}>
                  <li className={styles.hiwItem}>
                    <span className={styles.hiwItemNumber}>1.</span>
                    <p className={styles.hiwItemDescription}>
                      <span style={{ color: "#076993"}}>Deposit ETH or stETH</span> Open a vault and lock your collateral securely on-chain.
                    </p>
                  </li>
                  <li className={styles.hiwItem}>
                    <span className={styles.hiwItemNumber}>2.</span>
                    <p className={styles.hiwItemDescription}>
                      <span style={{ color: "#076993"}}>Mint JUSD</span> Borrow up to your collateral limit at a fixed 1% annual rate. No hidden fees. No surprise interest hikes.
                    </p>
                  </li>
                  <li className={styles.hiwItem}>
                    <span className={styles.hiwItemNumber}>3.</span>
                    <p className={styles.hiwItemDescription}>
                      <span style={{ color: "#076993"}}>Put JUSD to Work</span> Trade, invest, or loop your position to amplify returns while your staked ETH continues earning yield.
                    </p>
                  </li>
                  <li className={styles.hiwItem}>
                    <span className={styles.hiwItemNumber}>4.</span>
                    <p className={styles.hiwItemDescription}>
                      <span style={{ color: "#076993"}}>Manage Your Vault</span> Track your collateral ratio in real time. Add collateral or repay at your own pace to maintain safety thresholds.
                    </p>
                  </li>
                  <li className={styles.hiwItem}>
                    <span className={styles.hiwItemNumber}>5.</span>
                    <p className={styles.hiwItemDescription}>
                      <span style={{ color: "#076993"}}>Repay Anytime</span> Close your vault when ready and reclaim your collateral in full.
                    </p>
                  </li>
                </ul>
              </div>
              <div className={styles.rightSec}>
                <h2 className={styles.innerHead}>Why Borrow on SLATE</h2>
                <div className={styles.benefitList}>
                  <div className={styles.benefitItem}>
                    <img src="/term-1.svg" alt="term 1" className={styles.benefitImage} />
                    <span className={styles.benefitSubHead}>Lowest Fixed Rate in DeFi</span>
                    <p className={styles.benefitDescription}>Just 1% annual interest, with no risk of sudden hikes.</p>
                  </div>
                  <div className={styles.benefitItem}>
                    <img src="/term-2.svg" alt="term 2" className={styles.benefitImage} />
                    <span className={styles.benefitSubHead}>Keep Earning Staking Rewards</span>
                    <p className={styles.benefitDescription}>Returns increase during market volatility and downturns</p>
                  </div>
                  <div className={styles.benefitItem}>
                    <img src="/term-3.svg" alt="term 3" className={styles.benefitImage} />
                    <span className={styles.benefitSubHead}>Unlock Liquidity Without Selling</span>
                    <p className={styles.benefitDescription}>
                      Access funds without triggering a taxable sale of your crypto holdings.
                    </p>
                  </div>
                  <div className={styles.benefitItem}>
                    <img src="/term-4.svg" alt="term 4" className={styles.benefitImage} />
                    <span className={styles.benefitSubHead}>Leverage ETH Exposure</span>
                    <p className={styles.benefitDescription}>Loop positions up to ~3× at max collateralization, boosting both exposure and yield.</p>
                  </div>
                  <div className={styles.benefitItem}>
                    <img src="/term-3.svg" alt="term 3" className={styles.benefitImage} />
                    <span className={styles.benefitSubHead}>Full Control</span>
                    <p className={styles.benefitDescription}>
                      No repayment schedule; maintain collateral health and close the position when you choose
                    </p>
                  </div>
                  <div className={styles.benefitItem}>
                    <img src="/term-4.svg" alt="term 4" className={styles.benefitImage} />
                    <span className={styles.benefitSubHead}>Use JUSD Anywhere</span>
                    <p className={styles.benefitDescription}>Trade, invest, or deploy into DeFi strategies.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.collatration}>
              <h5 className={styles.innerHead}>Collateralization</h5>
              <div className={styles.collatrationItemSec}>
                <div className={styles.collatrationItem}>
                  <div className={styles.benefitCount}>
                    ( 0 )
                  </div>
                  <div className={styles.collatrationDesc}>
                    Initial minting requirement: 150% overcollateralization
                  </div>
                </div>
                <div className={styles.collatrationItem}>
                  <div className={styles.benefitCount}>
                    ( 1 )
                  </div>
                  <div className={styles.collatrationDesc}>
                    Liquidation threshold: Below 120% collateral value
                  </div>
                </div>
                <div className={styles.collatrationItem}>
                  <div className={styles.benefitCount}>
                    ( 2 )
                  </div>
                  <div className={styles.collatrationDesc}>
                    Liquidation penalty: 10% of repaid debt value
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
           <div id="stabilityfund">
            <div className={styles.stabilityFund}>
              <div className={styles.leftContent}>
                {/* <h5 className={styles.subHead}>What is</h5> */}
                <h2 className={styles.mainHead}>
                  Stable, Uncorrelated Returns in All Market Conditions
                </h2>
              </div>
              <div className={styles.rightContent}>
                <p className={styles.description}>
                  Deposit JUSD into the Stability Fund and earn from liquidation premiums, a source of yield that grows when markets drop, without taking price exposure.
                </p>
              </div>
            </div>
            <div className={styles.hiwSec}>
              <div className={styles.leftSec}>
                <h5 className={styles.innerHead}>How Earning Works</h5>
                <ul className={styles.hiwList}>
                  <li className={styles.hiwItem}>
                    <span className={styles.hiwItemNumber}>1.</span>
                    <p className={styles.hiwItemDescription}>
                      <span style={{ color: "#A96E00" }}>Deposit JUSD into the Stability Fund</span> Your JUSD provides the liquidity needed to instantly liquidate risky vaults.
                    </p>
                  </li>
                  <li className={styles.hiwItem}>
                    <span className={styles.hiwItemNumber}>2.</span>
                    <p className={styles.hiwItemDescription}>
                      <span style={{ color: "#A96E00" }}>Earn from Liquidations</span>  When a vault’s collateral ratio falls below the safety threshold, the Fund acquires collateral at a discount, creating profit.
                    </p>
                  </li>
                  <li className={styles.hiwItem}>
                    <span className={styles.hiwItemNumber}>3.</span>
                    <p className={styles.hiwItemDescription}>
                      <span style={{ color: "#A96E00" }}>No Market Drawdown Risk</span> Your returns come from liquidation premiums and the Treasury backstop, not from betting on asset prices.
                    </p>
                  </li>
                  <li className={styles.hiwItem}>
                    <span className={styles.hiwItemNumber}>4.</span>
                    <p className={styles.hiwItemDescription}>
                      <span style={{ color: "#A96E00" }}>Transparent and On-Chain</span> All Stability Fund activity and earnings are visible in real time.
                    </p>
                  </li>
                  <li className={styles.hiwItem}>
                    <span className={styles.hiwItemNumber}>5.</span>
                    <p className={styles.hiwItemDescription}>
                      <span style={{ color: "#A96E00" }}>Flexible Access</span> Withdraw your funds when you need them, with the freedom to stay invested through market cycles. <span className={styles.finalNote}>(Final withdrawal rules to be confirmed at launch.)</span>
                    </p>
                  </li>
                </ul>
              </div>
              <div className={styles.rightSec}>
                <h2 className={styles.innerHead}>Why Invest in the Stability Fund</h2>
                <div className={styles.benefitList}>
                  <div className={styles.benefitItem}>
                    <img src="/benefit-1.svg" alt="Benefit 1" className={styles.benefitImage} />
                    <span className={styles.benefitSubHead}>Uncorrelated Returns</span>
                    <p className={styles.benefitDescription}>
                      Historically low correlation with equities, bonds, and crypto means the Fund can add stability to almost any portfolio.
                    </p>
                  </div>
                  <div className={styles.benefitItem}>
                    <img src="/benefit-4.svg" alt="Benefit 2" className={styles.benefitImage} />
                    <span className={styles.benefitSubHead}>No Price Drawdowns</span>
                    <p className={styles.benefitDescription}>
                      Returns are generated from liquidation premiums, not market direction, resulting in steady growth through bull and bear markets.
                    </p>
                  </div>
                  <div className={styles.benefitItem}>
                    <img src="/benefit-2.svg" alt="Benefit 3" className={styles.benefitImage} />
                    <span className={styles.benefitSubHead}>Crisis-Resilient</span>
                    <p className={styles.benefitDescription}>
                      Tends to perform best when markets fall, as liquidation activity increases.
                    </p>
                  </div>
                  <div className={styles.benefitItem}>
                    <img src="/benefit-3.svg" alt="Benefit 4" className={styles.benefitImage} />
                    <span className={styles.benefitSubHead}>Stablecoin-Denominated</span>
                    <p className={styles.benefitDescription}>
                      All returns paid in JUSD, keeping performance independent of asset price swings.
                    </p>
                  </div>
                  <div className={`${styles.benefitItem} ${styles.benifitFullWidth}`}>
                    <img src="/benefit-3.svg" alt="Benefit 4" className={styles.benefitImage} />
                    <span className={styles.benefitSubHead}>Portfolio Efficiency</span>
                    <p className={styles.benefitDescription}>
                      Adding the Stability Fund can shift your efficient frontier upward, improving risk-adjusted returns without adding volatility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.performace}>
              <div className={styles.performaceHead}>
                <div className={styles.performanceHeadContent}>
                  <h6 className={styles.supHead}>Performace Comparison</h6>
                  <h2 className={styles.headStabilty}>Stability Fund vs. Traditional Assets</h2>
                </div>
                <div className={styles.rightSideContent}>
                  <label className={styles.switchBtn}>
                    <input type="checkbox" className={styles.inputRadio} />
                    <span className={styles.sliderRounded}></span>
                  </label>
                  <span className={styles.cryptoText}>
                    INCLUDE CRYPTO
                  </span>
                </div>
              </div>
              <div className={styles.dataSource}>
                <span className={`${styles.spanText} ${styles.highlightSpanTxt}`}>
                  Data source:
                </span>
                <span className={styles.spanTextRight}>
                  Based on MakerDAO historical liquidation data with assumptions about the percentage of DAI deposited into a Stability Fund equivalent. If more utility of JUSD becomes available, liquidation rewards from excess collateral could be distributed over a smaller percentage of minted JUSD, potentially resulting in higher returns than shown.
                </span>
              </div>
              <div className={styles.chartBox}>
                <MultiLineChart />
              </div>
              <div className={styles.dataSource}>
                <span className={`${styles.spanText} ${styles.highlightSpanTxt}`}>
                  Note:
                </span>
                <span className={styles.spanTextRight}>
                  Based on MakerDAO historical liquidation data with assumptions about the percentage of DAI deposited into a Stability Fund equivalent. If more utility of JUSD becomes available, liquidation rewards from excess collateral could be distributed over a smaller percentage of minted JUSD, potentially resulting in higher returns than shown.
                </span>
              </div>
            </div>
            <div className={styles.performace}>
              <div className={styles.performaceHead}>
                <div className={styles.performanceHeadContent}>
                  <h6 className={styles.supHead}>Correlation to Other Assets</h6>
                  <h2 className={styles.headStabilty}>Asset Correlation Matrix</h2>
                  <p className={styles.stabilityDesc}>
                    The Stability Fund shows near-zero or negative correlation with traditional assets and cryptocurrencies, making it an excellent portfolio diversifier that can reduce overall risk.
                  </p>
                </div>
              </div>
              <div className={styles.chartBox}>
              <CorrelationMatrix />
              </div>
              <div className={styles.dataSource}>
                <span className={`${styles.spanText} ${styles.highlightSpanTxt}`}>
                  Stability Fund Benefits:
                </span>
                <span className={styles.spanTextRight}>
                  With correlations close to zero or negative against most assets, the Stability Fund provides true diversification that helps reduce portfolio volatility.
                </span>
              </div>
            </div>
            <div className={styles.performace}>
              <div className={styles.performaceHead}>
                <div className={styles.performanceHeadContent}>
                  <h6 className={styles.supHead}>Portfolio Optimization Benefits</h6>
                  <h2 className={styles.headStabilty}>Portfolio Allocation Analysis</h2>
                  <p className={styles.stabilityDesc}>
                    This analysis demonstrates how including the Stability Fund in a portfolio improves risk-adjusted returns, maintaining the same volatility target while achieving higher returns.
                  </p>
                </div>
              </div>
              <div className={styles.chartBox}>
                <OptimalAllocationTable />
              </div>
            </div>
            <div className={styles.performace}>
              <div className={styles.performaceHead}>
                <div className={styles.performanceHeadContent}>
                  <h6 className={styles.supHead}>Portfolio Optimization Benefits</h6>
                  <h2 className={styles.headStabilty}>Efficient Frontier Comparison</h2>
                  <p className={styles.stabilityDesc}>
                    The chart shows how adding the Stability Fund to a portfolio shifts the efficient frontier upward, enabling higher returns for the same level of risk. The green dashed line (With Stability Fund) achieves superior risk-adjusted returns compared to the red dashed line (No Stability Fund).
                  </p>
                </div>
              </div>
              <div className={styles.chartBox}>
                <FrontiersCalChart />
              </div>
            </div>
            <div className={`${styles.performace} ${styles.conclusionBox}`}>
              <div className={styles.performaceHead}>
                <div className={styles.performanceHeadContent}>
                  <h6 className={styles.supHead}>Conclusion</h6>
                  <h2 className={styles.headStabilty}>Key Takeaways</h2>
                </div>
              </div>
              <ul className={styles.conclusion}>
                <li className={styles.conclusionItem}>
                  At 10% volatility, portfolios with the Stability Fund achieve ~30% higher returns (12.94% vs 9.88% unlevered)
                </li>
                <li className={styles.conclusionItem}>
                  With leverage, including the Stability Fund can nearly double returns (18.24% vs 10.01%)
                </li>
                <li className={styles.conclusionItem}>
                  The Stability Funds unique properties enable optimizers to allocate significant portions to it (59.52% unlevered)
                </li>
                <li className={styles.conclusionItem}>
                  Traditional portfolio optimization shows the Stability Funds potential as a strategic portfolio component
                </li>
              </ul>
            </div>
          </div>
        }
      </div>
    </div>
  );
}