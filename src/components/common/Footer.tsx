import React from "react";
import styles from "./Footer.module.css";
import { getHref } from "../../helpers";

interface IFooter {}

const Footer: React.FC<IFooter> = () => {
  return (
    <div className={styles.FooterWrapper}>
      <div className={styles.Footer}>
        <div className={styles.ContentWrapper}>
          <span className={styles.Copyright}>© Harriot Software</span>

          <a
            href={getHref("COSTA_Express_ohjeet.pdf").toString()}
            title={"COSTA Express ohjeet"}
            target={"_blank"}
            rel={"noreferrer"}
          >
            COSTA Express OHJEET
          </a>

          <a
            href={getHref("COSTA_Express_lemmikit.pdf").toString()}
            title={"COSTA Express lemmikit"}
            target={"_blank"}
            rel={"noreferrer"}
          >
            COSTA Express LEMMIKIT
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
