import React from "react";

import styles from "./InfoBoxes.module.css";
import IImage from "../../../interfaces/IImage";
import { getHref } from "../../../helpers";

interface IProps {}

const InfoBoxes: React.FC<IProps> = () => {
  const infobox1: IImage = {
    url: getHref("/img/img1-landing-20.jpg").toString(),
    alt: "Moottoripyörä",
    title: "Moottoripyörä",
  };

  const infobox2: IImage = {
    url: getHref("/img/img2-landing-20.jpg").toString(),
    alt: "Muuttolaatikot",
    title: "Muuttolaatikot",
  };

  const infobox3: IImage = {
    url: getHref("/img/img3-landing-20.jpg").toString(),
    alt: "Eläimet",
    title: "Eläimet",
  };

  const infobox4: IImage = {
    url: getHref("/img/paku-592x592-80.jpg").toString(),
    alt: "Pakettiauto",
    title: "Pakettiauto",
  };

  return (
    <div className={styles.Wrapper}>
      <h2 className={styles.Title}>Kuljetamme mitä vaan</h2>

      <div className={styles.Container}>
        <div className={styles.Row}>
          <img
            className={styles.RowImage}
            src={infobox3.url}
            alt={infobox3.alt}
            title={infobox3.title}
          />

          <div className={styles.RowText}>
            <div>
              <span>Koirat</span>
              <span>Kissat</span>
              <span>Muut lemmikit</span>
              <span>Tarvittaessa vuokrahäkit</span>
            </div>
          </div>
        </div>

        <div className={styles.Row}>
          <div className={styles.RowText}>
            <div>
              <span>Motot ja mopot</span>
              <span>Invamopot</span>
              <span>Polkupyörät</span>
              <span>Scootit ymt.</span>
              <span>Autot (ajaen)</span>
            </div>
          </div>

          <img
            className={styles.RowImage}
            src={infobox1.url}
            alt={infobox1.alt}
            title={infobox1.title}
          />
        </div>

        <div className={styles.Row}>
          <img
            className={styles.RowImage}
            src={infobox2.url}
            alt={infobox2.alt}
            title={infobox2.title}
          />

          <div className={styles.RowText}>
            <div>
              <span>Laukut, laatikot</span>
              <span>Muuttokuormat</span>
              <span>Juomatoimitukset</span>
              <span>Muut kaupoista noudot</span>
            </div>
          </div>
        </div>

        <div className={styles.Row}>
          <div className={styles.RowText}>
            <div>
              <span>Costa del Solilla:</span>
              <span>Muutot</span>
              <span>Jakelut</span>
              <span>IKEA ym. noudot</span>
              <span>Muut kuljetukset</span>
            </div>
          </div>

          <img
            className={styles.RowImage}
            src={infobox4.url}
            alt={infobox4.alt}
            title={infobox4.title}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoBoxes;
