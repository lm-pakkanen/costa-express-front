import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga';

import reportWebVitals from './reportWebVitals';

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

};

configureApp().then(() => {
    console.log('App configured');
});

ReactDOM.render(
  <React.StrictMode>
      <Router>

          <AppContextProvider>
              <AppBoundary>
                  <App />
              </AppBoundary>
          </AppContextProvider>

      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);