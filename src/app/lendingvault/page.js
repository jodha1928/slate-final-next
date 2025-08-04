import styles from "./lendingvault.module.scss";
import Header1 from "../components/common/header1";
import WhatIsLendingVault from "../components/landingVault/whatIsLandingVault/whatIsLandingVault";
import KeyBenefits from "../components/landingVault/keyBenefits/keyBenefits";
import HowStabilityFund from "../components/landingVault/howStabilityFund/howStabiltyFund";

export default function LendingVault() {
  return (
    <div className={styles.lendingvault}>
      <Header1 />
      <WhatIsLendingVault />
      <KeyBenefits />
      <HowStabilityFund />
    </div>
  );
}
