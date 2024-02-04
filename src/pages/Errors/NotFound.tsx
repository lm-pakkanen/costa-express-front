import React from "react";

import NotFoundContainer from "../../components/pages/Errors/Errors";
import Page from "../../components/pages/Page";

import styles from "./NotFound.module.css";

interface Props {}

const NotFound: React.FC<Props> = () => {
  return (
    <Page style={styles.NotFound}>
      <NotFoundContainer>
        <h1>404</h1>
        <div>Etsimääsi sivua ei löydetty.</div>
      </NotFoundContainer>
    </Page>
  );
};

export default NotFound;
