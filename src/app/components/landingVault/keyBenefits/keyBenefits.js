
import styles from "./keyBenefits.module.scss";

export default function KeyBenefits() {
    return (
        <div className={styles.KeyBenefits}>
            <div className={`${styles.KeyBenefitsWrapper} container`}>
                <div className={styles.mainHeadContent}>
                    <h2 className={styles.mainHead}>Key Benefits</h2>
                </div>
                <div className={styles.benefitList}>
                    <div className={styles.item}>
                        <div className={styles.icon}>
                            <svg width="42" height="39" viewBox="0 0 42 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="19.8477" y="0.976562" width="1.90738" height="37.7649" rx="0.953688" fill="white" />
                                <path d="M21.5078 6.46094H36.3548L40.1423 9.75602L36.3548 12.8618H21.5078" stroke="white" stroke-width="2" stroke-linejoin="round" />
                                <path d="M20.2012 13.3828H5.3542L1.56664 16.6779L5.3542 19.7836H20.2012" stroke="white" stroke-width="2" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className={styles.text}>
                            <h6 className={styles.stepCount}>( 01 )</h6>
                            <p className={styles.description}>Truly uncorrelated returns with no historical drawdowns</p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.icon}>
                            <svg width="42" height="39" viewBox="0 0 42 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="19.8477" y="0.976562" width="1.90738" height="37.7649" rx="0.953688" fill="white" />
                                <path d="M21.5078 6.46094H36.3548L40.1423 9.75602L36.3548 12.8618H21.5078" stroke="white" stroke-width="2" stroke-linejoin="round" />
                                <path d="M20.2012 13.3828H5.3542L1.56664 16.6779L5.3542 19.7836H20.2012" stroke="white" stroke-width="2" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className={styles.text}>
                            <h6 className={styles.stepCount}>( 02 )</h6>
                            <p className={styles.description}>Returns increase during market volatility and downturns</p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.icon}>
                            <svg width="42" height="39" viewBox="0 0 42 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="19.8477" y="0.976562" width="1.90738" height="37.7649" rx="0.953688" fill="white" />
                                <path d="M21.5078 6.46094H36.3548L40.1423 9.75602L36.3548 12.8618H21.5078" stroke="white" stroke-width="2" stroke-linejoin="round" />
                                <path d="M20.2012 13.3828H5.3542L1.56664 16.6779L5.3542 19.7836H20.2012" stroke="white" stroke-width="2" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className={styles.text}>
                            <h6 className={styles.stepCount}>( 03 )</h6>
                            <p className={styles.description}>Seizes StETH at a 10% discount during liquidations</p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.icon}>
                            <svg width="42" height="39" viewBox="0 0 42 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="19.8477" y="0.976562" width="1.90738" height="37.7649" rx="0.953688" fill="white" />
                                <path d="M21.5078 6.46094H36.3548L40.1423 9.75602L36.3548 12.8618H21.5078" stroke="white" stroke-width="2" stroke-linejoin="round" />
                                <path d="M20.2012 13.3828H5.3542L1.56664 16.6779L5.3542 19.7836H20.2012" stroke="white" stroke-width="2" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className={styles.text}>
                            <h6 className={styles.stepCount}>( 04 )</h6>
                            <p className={styles.description}>Automatic liquidation process requires no manual trading</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
