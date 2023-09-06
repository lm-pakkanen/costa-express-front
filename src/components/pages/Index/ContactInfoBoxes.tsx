import React from "react";

import styles from "./ContactInfoBoxes.module.css";
import IImage from "../../../interfaces/IImage";
import { addStylesToClass, getHref } from "../../../helpers";

interface IContactInfoBoxes {}

const emailIcon: IImage = {
  url: getHref("/img/FontAwesome/envelope.svg").toString(),
  alt: "Sähköposti",
  title: "Sähköposti",
};

const whatsappIcon: IImage = {
  url: getHref("/img/FontAwesome/whatsapp.svg").toString(),
  alt: "Whatsapp",
  title: "Whatsapp",
};

const phoneIcon: IImage = {
  url: getHref("/img/FontAwesome/phone-square-alt.svg").toString(),
  alt: "Puhelin",
  title: "Puhelin",
};

const ContactInfoBoxes: React.FC<IContactInfoBoxes> = () => {
  const emailButtonStyle = addStylesToClass(styles.Item, [styles.ItemButton]);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <a
          className={emailButtonStyle}
          href={"mailto:jukka@exch.fi"}
          title={"Lähetä sähköposti"}
        >
          <i className={styles.ItemIcon}>
            <img
              src={emailIcon.url}
              alt={emailIcon.alt}
              title={emailIcon.title}
            />
          </i>
          <div>jukka@exch.fi</div>
        </a>

        <div className={styles.Item}>
          <i className={styles.ItemIcon}>
            <img
              src={phoneIcon.url}
              alt={phoneIcon.alt}
              title={phoneIcon.title}
            />
          </i>
          <div>+358 40 7151474</div>
        </div>

        <div className={styles.Item}>
          <i className={styles.ItemIcon}>
            <img
              src={whatsappIcon.url}
              alt={whatsappIcon.alt}
              title={whatsappIcon.title}
            />
          </i>
          <div>+358 40 7151474</div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoBoxes;
