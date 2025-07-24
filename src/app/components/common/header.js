import styles from "./header.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerWrapper} container`}>
        <nav>
            <ul className={styles.navList}>
                <li className={styles.menuItem}>
                    <Link href="/">About</Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/lendingvault">Stability Fund</Link>  
                </li>
                <li className={styles.logo}>
                    <Link href="/">
                        <Image priority src="/logo.svg" alt="Logo" width={130} height={26} />
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/about">Lending Vault</Link>    
                </li>
                <li className={styles.menuItem}>
                    <Link href="/contact">Contact us</Link>
                </li>
            </ul>
        </nav>
      </div>
    </header>
  );
}
