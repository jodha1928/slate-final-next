"use client"

import styles from "./slateToken.module.scss";
import Image from "next/image";
import { useRef, useEffect } from "react";

const tokenUtilityItems = [
	{
		icon: "/token-utility-1.svg",
		title: "Governance",
		desc: "Vote on protocol upgrades, parameter changes, and treasury allocations",
	},
	{
		icon: "/token-utility-2.svg",
		title: "Rewards",
		desc: "Earn rewards for participating in governance and protocol activities",
	},
	{
		icon: "/token-utility-3.svg",
		title: "Passive Income",
		desc: "Receive additional passive income for Stability Fund depositors",
	},
	{
		icon: "/token-utility-4.svg",
		title: "Incentives",
		desc: "Incentivize behaviors that benefit the protocol ecosystem",
	},
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
		<div className={styles.slateToken}>
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
						is the Native Governance <br /> Token of the Protocol
					</h5>
				</div>
            </div>
            <div className={`${styles.slateTokenBox}`}>
                <div className={styles.slateTokenBgLeft}></div>
                <div className={`${styles.slateTokenWrapper} container`}>
                    <div className={styles.slateTokenInnerSection}>
                        <p className={styles.slateTokenDescription}>
                            Slate is the native governance token of the protocol, designed to
                            align incentives between users and the protocol itself. The SLATE token
                            serves as the governance token for the protocol, allowing holders to
                            participate in decision-making and earn rewards. Initially distributed
                            through an airdrop to early users, it creates a path for protocol
                            ownership among its most active participants. Long-term, SLATE will be
                            used to provide additional passive income to Stability Fund depositors
                            and incentivize specific behaviors that benefit the protocol ecosystem
                            as a whole.
                        </p>
                        <div className={styles.tokenUtility}>
                            <h6 className={styles.tokenUtilityTitle}>Token Utility</h6>
                            <div className={styles.tokenUtilityList}>
                                {tokenUtilityItems.map((item, idx) => (
                                    <div className={styles.tokenUtilityItem} key={idx}>
                                        <div className={styles.tokenUtilityIcon}>
                                            {/* <Image
                                                src={item.icon}
                                                alt={item.title}
                                                width={24}
                                                height={24}
                                                /> */}
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
                        <div className={styles.tokenUtility}>
                            <h6 className={styles.tokenUtilityTitle}>Token Distribution</h6>
                            <div className={styles.tokenUtilityList}>
                                {tokenDistributionItems.map((item, idx) => (
                                    <div className={styles.tokenUtilityItem} key={idx}>
                                        <div className={styles.tokenUtilityIcon}>
                                            <span className={styles.tokenUtilityPercentage}>{item.percentage}</span>
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
                        <div className={`${styles.tokenUtility} ${styles.initialAirdrop}`}>
                            <div className={styles.initialAirdropContent}>
                                <h6 className={styles.tokenUtilityTitle}>Initial Airdrop</h6>
                                <p className={styles.initialAirdropDescription}>15% of the total SLATE supply will be airdropped to early users of the protocol.</p>
                            </div>
                            <div className={styles.initialAirdropList}>
                                <div className={styles.initialAirdropItem}>
                                    <span className={styles.initialAirdropEligibility}>Eligibility</span>
                                    <p className={styles.initialAirdropItemDesc}>Users who borrow JUSD by depositing StETH collateral during the initial phase.</p>
                                </div>
                                <div className={styles.initialAirdropItem}>
                                    <span className={styles.initialAirdropEligibility}>Eligibility</span>
                                    <p className={styles.initialAirdropItemDesc}>Users who borrow JUSD by depositing StETH collateral during the initial phase.</p>
                                </div>
                                <div className={styles.initialAirdropItem}>
                                    <span className={styles.initialAirdropEligibility}>Eligibility</span>
                                    <p className={styles.initialAirdropItemDesc}>Users who borrow JUSD by depositing StETH collateral during the initial phase.</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.tokenUtility}>
                            <h6 className={`${styles.tokenUtilityTitle} ${styles.protocolBuybacksTitle}`}>Protocol Buybacks</h6>
                            <p className={styles.tokenUtilityDescription}>
                                The Treasury will use protocol earnings to periodically buy back SLATE from the market.
                            </p>
                            <div className={`${styles.earningMechanismList} ${styles.protocolBuybacksList}`}>
                                {protocolBuybacksList.map((item, idx) => (
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
                            <h6 className={`${styles.earningMechanismTitle} ${styles.buyBackUsage}`}>Buy-back Usage</h6>
                            <p className={styles.initialAirdropItemDesc}>Bought-back tokens will be used for continued incentivization of specific behaviors based on protocol needs.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.slateTokenBgRight}></div>
            </div>
		</div>
	);
}
