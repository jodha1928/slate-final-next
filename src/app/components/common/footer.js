"use client";

import styles from "./footer.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <header className={styles.footer}>
      <div className={`${styles.footerWrapper} container`}>
        <h3 className={styles.allRights}>For partnership and media inquiries</h3>
        <ul className={styles.footerMenu}>
            <li className={styles.menuItem}>
                <Link href="/">
                    <Image width={22} height={22} src="/github.svg" alt="github" />
                </Link>
            </li>
            <li className={styles.menuItem}>
                <Link href="/">
                    <Image width={22} height={22} src="/discord.svg" alt="discord" />
                </Link>
            </li>
            <li className={styles.menuItem}>
                <Link href="/">
                    <Image width={22} height={22} src="/instagram.svg" alt="instagram" />
                </Link>
            </li>
            <li className={styles.menuItem}>
                <Link href="/">
                    <Image width={22} height={22} src="/linkedin.svg" alt="linkedin" />
                </Link>
            </li>
            <li className={styles.menuItem}>
                <Link href="/">
                    <Image width={22} height={22} src="/facebook.svg" alt="facebook" />
                </Link>
            </li>
        </ul>
        <h3 className={`${styles.allRights} ${styles.smallText}`}>All Rights Reservedn slate protocol</h3>
      </div>
    </header>
  );
}
