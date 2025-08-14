"use client";

import styles from "./header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#hiw"); // default active

  const navLinksLeft = [
    { href: "#stabilityfund", label: "Stability Fund" },
    { href: "#", label: "Lending Vault" },
  ];

  const navLinksRight = [
    { href: "#", label: "Tokenomics" },
    { href: "#contact", label: "Contact us" },
  ];

  const handleClick = (href) => {
    setActiveLink(href);
    setIsMenuOpen(false); // close mobile menu after click
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.headerWrapper} container`}>
        <div className={styles.mobileLogo}>
          <Link href="/">
            <Image priority src="/logo.svg" alt="Logo" width={130} height={26} />
          </Link>
          <div
            className={styles.menuIcon}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
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
            {/* Left side links */}
            {navLinksLeft.map(({ href, label }) => (
              <li
                key={href}
                className={`${styles.menuItem} ${activeLink === href ? styles.active : ""
                  }`}
              >
                <Link href={href} onClick={() => handleClick(href)}>
                  {label}
                </Link>
              </li>
            ))}

            {/* Center Logo */}
            <li className={styles.logoItem}>
              <Link href="/">
                <Image
                  priority
                  src="/logo.svg"
                  alt="Logo"
                  width={130}
                  height={26}
                />
              </Link>
            </li>

            {/* Right side links */}
            {navLinksRight.map(({ href, label }) => (
              <li
                key={href}
                className={`${styles.menuItem} ${activeLink === href ? styles.active : ""
                  }`}
              >
                <Link href={href} onClick={() => handleClick(href)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
