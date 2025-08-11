import styles from "./page.module.scss";
import Header from "./components/common/header";
import Banner from "./components/home/banner/banner";
import HowItWorks from "./components/home/howItWorks/howItWorks";
import SlateToken from "./components/home/slateToken/slateToken";
import SlateProtocolIncome from "./components/home/slateProtocolIncome/slateProtocolIncome";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <HowItWorks />
      <SlateProtocolIncome />
      <SlateToken />
    </>
  );
}
