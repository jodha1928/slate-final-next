"use client";

import styles from "./newsletter.module.scss";
import Image from "next/image";

export default function Newsletter() {
  return (
    <div className={styles.newsletter} id="contact">
      <div className={`${styles.newsletterWrap} container`}>
        <h2 className={styles.mainHead}>Get Notified</h2>
        <input className={styles.email} type="email" placeholder="your email address*" />
        <button className={styles.btn}>Subscribe</button>
        <Image className={styles.imgSec} src="/newsletter-bg.png" alt="newsletter-bg" width={975} height={206} />
      </div>
    </div>
  );
}