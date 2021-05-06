import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useStoreConfigure } from './hooks/useStoreConfigure';

import NotFound from './pages/Errors/NotFound';

import Index from './pages/Index';
import Projects from './pages/Projects';

import './reset.css';
import './global.css';

import styles from './App.module.css';
import PrivacyPolicy from './pages/PrivacyPolicy';

interface Props {}

const App: React.FC<Props> = () => {

    const [isConfigReady, setIsConfigReady] = useState(false);

    /** Configure store before anything else happens */
    useStoreConfigure().then(() => {
        setIsConfigReady(true);
    });

    const { t: translate, ready: isI18nReady } = useTranslation('navigation');

    // TODO: Proper component
    if (!isConfigReady || !isI18nReady) {
        return (
            <>loading...</>
        );
    }

    /** Utility for converting translation to path */
    const getPath = (page: string) => {
        return `/${page}`;
    };

    return (
        <div id={'app'} className={styles.App}>

            <Switch>

                <Route
                    path={getPath(translate('links.urls.privacyPolicy'))}
                    exact
                    component={
                        () => <PrivacyPolicy />
                    }
                />

                <Route
                    path={getPath('')}
                    exact
                    component={
                        () => <Index />
                    }
                />

                <Route
                    path={getPath(translate('links.urls.projects'))}
                    exact
                    component={
                        () => <Projects />
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