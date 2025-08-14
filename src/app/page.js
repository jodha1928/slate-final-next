import styles from "./page.module.scss";
import Header from "./components/common/header";
import Banner from "./components/home/banner/banner";
import HowItWorks from "./components/home/howItWorks/howItWorks";
import SlateToken from "./components/home/slateToken/slateToken";
import SlateProtocolIncome from "./components/home/slateProtocolIncome/slateProtocolIncome";
import Newsletter from "./components/home/newsletter/newsletter";
import Footer from "./components/common/footer";

export default function Home() {
  return (
    <div className={styles.innerBody}>
      <Header />
      <Banner />
      <HowItWorks />
      <SlateProtocolIncome />
      <SlateToken />
      <Newsletter />
      <Footer />
    </div>
  );
}
