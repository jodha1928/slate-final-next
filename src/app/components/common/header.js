"use client";

import styles from "./header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#hiw"); // default active

  const navLinksLeft = [
    { href: "#hiw", label: "About" },
    { href: "#stabilityfund", label: "Stability Fund" },
  ];

  const navLinksRight = [
    { href: "#", label: "Lending Vault" },
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
            ☰
          </div>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
          <ul className={styles.navList}>
            {/* Left side links */}
            {navLinksLeft.map(({ href, label }) => (
              <li
                key={href}
                className={`${styles.menuItem} ${
                  activeLink === href ? styles.active : ""
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
                className={`${styles.menuItem} ${
                  activeLink === href ? styles.active : ""
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
