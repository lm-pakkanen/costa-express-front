import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useStoreConfigure } from "./hooks/useStoreConfigure";
import NotFound from "./pages/Errors/NotFound";
import Index from "./pages/Index";
import styles from "./App.module.css";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import CookiesConsent from "./components/common/CookiesConsent";

import "./reset.css";
import "./global.css";

interface Props {}

const WithCookieConsent: React.FC = (props) => {
  return (
    <>
      {props.children}
      <CookiesConsent />
    </>
  );
};

const App: React.FC<Props> = () => {
  const [isConfigReady, setIsConfigReady] = useState(false);

  /** Configure store before anything else happens */
  useStoreConfigure().then(() => {
    setIsConfigReady(true);
  });

  // TODO: Proper component
  if (!isConfigReady) {
    return <>loading...</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY as string}
      scriptProps={{
        async: true,
      }}
    >
      <div id={"app"} className={styles.App}>
        <Routes>
          <Route
            path={"/costaexpress/tietosuoja"}
            element={
              <WithCookieConsent>
                <PrivacyPolicy />
              </WithCookieConsent>
            }
          />

          <Route
            path={"/costaexpress/tarjouspyynto"}
            element={
              <WithCookieConsent>
                <Contact />
              </WithCookieConsent>
            }
          />

          <Route
            path={"/costaexpress/"}
            element={
              <WithCookieConsent>
                <Index />
              </WithCookieConsent>
            }
          />

          <Route
            path={"*"}
            element={
              <WithCookieConsent>
                <NotFound />
              </WithCookieConsent>
            }
          />
        </Routes>
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default App;
