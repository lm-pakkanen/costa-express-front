import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { useStoreConfigure } from './hooks/useStoreConfigure';

import NotFound from './pages/Errors/NotFound';

import Index from './pages/Index';

import './reset.css';
import './global.css';

import styles from './App.module.css';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import CookiesConsent from './components/common/CookiesConsent';
import constants from './config/constants';

interface Props {}

const WithCookieConsent: React.FC = (props) => {
    return (
        <>
            { props.children }
            <CookiesConsent />
        </>
    )
}

const App: React.FC<Props> = () => {

    const [isConfigReady, setIsConfigReady] = useState(false);

    /** Configure store before anything else happens */
    useStoreConfigure().then(() => {
        setIsConfigReady(true);
    });

    // TODO: Proper component
    if (!isConfigReady) {
        return (
            <>loading...</>
        );
    }

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
            scriptProps={
                {
                    async: true
                }
            }
        >

            <div id={'app'} className={styles.App}>

                <Switch>

                    <Route
                        path={'/tietosuoja'}
                        exact
                        component={
                            () => (
                                <WithCookieConsent>
                                    <PrivacyPolicy />
                                </WithCookieConsent>
                            )
                        }
                    />

                    <Route
                        path={'/tarjouspyynto'}
                        exact
                        component={
                            () => (
                                <WithCookieConsent>
                                    <Contact />
                                </WithCookieConsent>
                            )
                        }
                    />

                    <Route
                        path={'/'}
                        exact
                        component={
                            () => (
                                <WithCookieConsent>
                                    <Index />
                                </WithCookieConsent>
                            )
                        }
                    />

                    <Route
                        path={'*'}
                        component={
                            () => (
                                <WithCookieConsent>
                                    <NotFound />
                                </WithCookieConsent>
                            )
                        }
                    />

                </Switch>

            </div>

        </GoogleReCaptchaProvider>
    );
};

export default App;