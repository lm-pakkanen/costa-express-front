import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import reportWebVitals from './reportWebVitals';

import { i18nextConfig } from './config/configs';
import constants from './config/constants';

import { AppContextProvider } from './contexts/AppContext';
import AppBoundary from './components/boundaries/AppBoundary';

import App from './App';

/** Configure root-level functions  */
const configureApp = async () => {

    /** Performance tracking */
    reportWebVitals(console.log);

    /** Google Analytics configuration */
    ReactGA.initialize(constants.ANALYTICS.GOOGLE.TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);

    /** Configure i18n */
    await i18next.init(i18nextConfig);

};

configureApp().then(() => {
    console.log('App configured');
});

ReactDOM.render(
  <React.StrictMode>
      <I18nextProvider i18n={i18next}>
          <Router>

              <AppContextProvider>
                  <AppBoundary>
                      <App />
                  </AppBoundary>
              </AppContextProvider>

          </Router>
      </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);