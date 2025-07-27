"use client";

import styles from "./header1.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header1() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
  return (
    <header className={styles.header}>
      <div className={`${styles.headerWrapper} container`}>
        <div className={styles.mobileLogo}>
          <Link href="/">
            <Image priority src="/logo2.svg" alt="Logo" width={22} height={32} />
          </Link>
          <div className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>
        </div>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
          <div className={styles.closeMenu} onClick={() => setIsMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <ul className={styles.navList}>
            <li className={styles.menuItem}>
              <Link href="/">About</Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/lendingvault">Stability Fund</Link>
            </li>
            <li className={styles.logo}>
              <Link href="/">
                <Image priority src="/logo2.svg" alt="Logo" width={22} height={32} />
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/lendingvault" className={styles.active}>Lending Vault</Link>
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
