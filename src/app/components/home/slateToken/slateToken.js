"use client"

import styles from "./slateToken.module.scss";
import Image from "next/image";
import { useRef, useEffect } from "react";

const tokenUtilityItems = [
	{
		icon: "/token_utility_1.svg",
		title: "Governance",
		desc: "Vote on key protocol decisions, including collateral types, safety thresholds, and incentive structures.",
	},
	{
		icon: "/token_utility_2.svg",
		title: "Incentivization",
		desc: "Earn SLATE for borrowing, Stability Fund deposits, and other growth-driving activities.",
	},
	{
		icon: "/token_utility_3.svg",
		title: "Alignment",
		desc: "Protocol revenues from lending, liquidations, arbitrage, and swap fees are used to regularly buy back SLATE from the market, with purchased tokens directed toward ongoing rewards and strategic incentives.",
	}
];

const earningMechanismItems = [
	{
		number: "01",
		title: "Governance participation rewards",
	},
	{
		number: "02",
		title: "Stability Fund deposit passive income",
	},
	{
		number: "03",
		title: "Staking rewards for locking tokens",
	},
	{
		number: "04",
		title: "Fee sharing from protocol revenue",
	},
];

const protocolBuybacksList = [
	{
		number: "01",
		title: "Liquidation share revenue"
	},
	{
		number: "02",
		title: "Interest from loans"
	},
	{
		number: "03",
		title: "Arbitrage profits"
	},
	{
		number: "04",
		title: "Exchange swap fees"
	},
];

const tokenDistributionItems = [
	{
        percentage: "40%",
		title: "Treasury Reserve",
		desc: "For long-term protocol development and incentives",
	},
	{
		percentage: "40%",
		title: "Treasury Reserve",
		desc: "For long-term protocol development and incentives",
	},
	{
		percentage: "40%",
		title: "Treasury Reserve",
		desc: "For long-term protocol development and incentives",
	},
	{
		percentage: "40%",
		title: "Passive Income",
		desc: "Receive additional passive income for Stability Fund depositors",
	},
	{
		percentage: "40%",
		title: "Passive Income",
		desc: "Receive additional passive income for Stability Fund depositors",
	}
];

export default function SlateToken() {
	return (
		<div className={styles.slateToken} id="slateTocken">
			<div className={`${styles.slateTokenWrapper} container`}>
				<div className={styles.slateTokenContent}>
					<Image
						src="/slatetoken.svg"
						alt="slatetoken"
						width={272}
						height={50}
						className={styles.slateTokenImage}
					/>
					<h5 className={styles.slateTokenText}>
                        Governance, Incentives, and <br />Shared Success
					</h5>
				</div>
            </div>
            <div className={`${styles.slateTokenBox}`}>
                <div className={styles.slateTokenBgLeft}></div>
                <div className={`${styles.slateTokenWrapper} container`}>
                    <div className={styles.slateTokenInnerSection}>
                        <p className={styles.slateTokenDescription}>
                            The SLATE token aligns borrowers, Stability Fund investors, and the platform itself. Holders gain a voice in governance, receive incentives for participation, and share in the protocol’s long-term growth.
                        </p>
                        <div className={styles.tokenUtility}>
                            <h6 className={styles.tokenUtilityTitle}>Token Utility</h6>
                            <div className={styles.tokenUtilityList}>
                                {tokenUtilityItems.map((item, idx) => (
                                    <div className={styles.tokenUtilityItem} key={idx}>
                                        <div className={styles.tokenUtilityIcon}>
                                            <Image
                                                src={item.icon}
                                                alt={item.title}
                                                width={64}
                                                height={64}
                                                />
                                        </div>
                                        <div className={styles.tokenUtilityContent}>
                                            <h6 className={styles.tokenUtilityContentTitle}>
                                                {item.title}
                                            </h6>
                                            <p className={styles.tokenUtilityContentDescription}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.tokenUtility}>
                            <h6 className={styles.tokenUtilityTitle}>Earning Mechanisms</h6>
                            <div className={styles.earningMechanismList}>
                                {earningMechanismItems.map((item, idx) => (
                                    <div className={styles.earningMechanismItem} key={idx}>
                                        <span className={styles.earningMechanismNumber}>
                                            ( {item.number} )
                                        </span>
                                        <h5 className={styles.earningMechanismTitle}>
                                            {item.title}
                                        </h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className={styles.tokenUtility}>
                            <h6 className={styles.tokenUtilityTitle}>Token Distribution</h6>
                            <div className={`${styles.tokenUtilityList} ${styles.tokenDistributionList}`}>
                                {tokenDistributionItems.map((item, idx) => (
                                    <div className={styles.tokenUtilityItem} key={idx}>
                                        <div className={`${styles.tokenUtilityIcon} ${styles.tokenUtilityIconPercentage}`}>
                                            <span className={styles.tokenUtilityPercentage}>{item.percentage}</span>
                                        </div>
                                        <div className={`${styles.tokenUtilityContent} ${styles.tokenUtilityContentDistribution}`}>
                                            <h6 className={styles.tokenUtilityContentTitle}>
                                                {item.title}
                                            </h6>
                                            <p className={styles.tokenUtilityContentDescription}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                        <div className={`${styles.tokenUtility} ${styles.initialAirdrop}`}>
                            <div className={styles.initialAirdropContent}>
                                <h6 className={styles.tokenUtilityTitle}>Provisional Distribution</h6>
                                <p className={styles.initialAirdropDescription}>(subject to change before launch)</p>
                            </div>
                            <div className={styles.initialAirdropList}>
                                <div className={styles.initialAirdropItem}>
                                    <span className={styles.initialAirdropEligibility}>20% First Airdrop</span>
                                    <p className={styles.initialAirdropItemDesc}>Rewarding early participants</p>
                                </div>
                                <div className={styles.initialAirdropItem}>
                                    <span className={styles.initialAirdropEligibility}>20% Second Airdrop</span>
                                    <p className={styles.initialAirdropItemDesc}>Supporting growth and adoption</p>
                                </div>
                                <div className={styles.initialAirdropItem}>
                                    <span className={styles.initialAirdropEligibility}>60% Treasury</span>
                                    <p className={styles.initialAirdropItemDesc}>Treasury, long-term incentives, and founding team</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.slateTokenBgRight}></div>
            </div>
		</div>
	);
}
