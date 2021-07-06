import React, { useContext, useEffect, useState } from 'react';

import { meta } from '../../config/actions';
import constants from '../../config/constants';

import { appStore } from '../../contexts/AppContext';

import useMemoryController from '../../hooks/controllers/useMemoryController';

import { addStylesToClass } from '../../helpers';

import styles from './CookiesConsent.module.css';

interface IDetailedCookiesConsent {}
interface ICookiesConsent {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DetailedCookiesConsent: React.FC<IDetailedCookiesConsent> = (props) => {

	return (

		<div>

		</div>

	);

};

const CookiesConsent: React.FC<ICookiesConsent> = (props) => {

	const appContext = useContext(appStore);
	const { state, dispatch } = appContext;

	const { storeCookieConsent } = useMemoryController();

	const { isCookiesAccepted } = state.meta;

	const defaultStyle = addStylesToClass(styles.Wrapper, [styles.hidden]);
	const [componentStyle, setComponentStyle] = useState(defaultStyle);

	const handleAllCookiesAccept = () => {

		const cookiesLevel = constants.COOKIES_LEVELS.MARKETING;

		dispatch({ type: meta.setCookiesAccepted, payload: { accepted: true, level: cookiesLevel } });
		storeCookieConsent(true, cookiesLevel);

	};

	const handleCookiesAccept = () => {

		const cookiesLevel = constants.COOKIES_LEVELS.BASIC;

		dispatch({ type: meta.setCookiesAccepted, payload: { accepted: true, level: cookiesLevel } });
		storeCookieConsent(true, cookiesLevel);

	};

	const handleCookiesReject = () => {

		const cookiesLevel = constants.COOKIES_LEVELS.NONE;

		dispatch({ type: meta.setCookiesAccepted, payload: { accepted: false, level: cookiesLevel } });
		storeCookieConsent(false, cookiesLevel);

	};

	useEffect(() => {
		if (!isCookiesAccepted) {
			setComponentStyle(styles.Wrapper);
		}
	}, [ isCookiesAccepted ]);

	return (

		<div className={componentStyle}>

			<div className={styles.Container}>

				<div className={styles.Header}>

					<div>
						Tämä sivusto käyttää evästeitä.
					</div>
					<div>
						Jatkaaksesi sivuston käyttämistä, hyväksy evästeiden käyttö.
					</div>

				</div>

				<div className={styles.Controls}>

					<button
						className={addStylesToClass(styles.CookieButton, [styles.accept])}
						onClick={handleAllCookiesAccept}
					>
						Hyväksy kaikki
					</button>

					<button
						className={addStylesToClass(styles.CookieButton, [styles.accept])}
						onClick={handleCookiesAccept}
					>
						Hyväksy välttämättömät
					</button>

					<button
						className={addStylesToClass(styles.CookieButton, [styles.reject])}
						onClick={handleCookiesReject}
					>
						Kiellä evästeiden käyttö
					</button>

				</div>

			</div>

		</div>

	);

};

export default CookiesConsent;