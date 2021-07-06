import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import constants from './config/constants';

import { useStoreConfigure } from './hooks/useStoreConfigure';

import NotFound from './pages/Errors/NotFound';

import Index from './pages/Index';

import './reset.css';
import './global.css';

import styles from './App.module.css';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';

interface Props {}

const App: React.FC<Props> = () => {

    console.debug(process.env.NODE_ENV, constants.BASE_URI);

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
                        () => <PrivacyPolicy />
                    }
                />

                <Route
                    path={'/tarjouspyynto'}
                    exact
                    component={
                        () => <Contact />
                    }
                />

                <Route
                    path={'/'}
                    exact
                    component={
                        () => <Index />
                    }
                />

                <Route
                    path={'*'}
                    component={
                        () =>
                            <NotFound />
                    }
                />

            </Switch>

        </div>
    );
}

export default App;