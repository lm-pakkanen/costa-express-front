import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { useStoreConfigure } from './hooks/useStoreConfigure';

import NotFound from './pages/Errors/NotFound';

import Index from './pages/Index';

import './reset.css';
import './global.css';

import styles from './App.module.css';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import CookiesConsent from './components/common/CookiesConsent';

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
    );
};

export default App;