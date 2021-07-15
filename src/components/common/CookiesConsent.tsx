import React, { useContext, useEffect, useState } from 'react';

import { meta } from '../../config/actions';
import constants from '../../config/constants';

import { appStore } from '../../contexts/AppContext';

import useMemoryController from '../../hooks/controllers/useMemoryController';

import { addStylesToClass } from '../../helpers';

import styles from './CookiesConsent.module.css';

interface ICookiesConsent {}

const CookiesConsent: React.FC<ICookiesConsent> = (props) => {

	const appContext = useContext(appStore);
	const { state, dispatch } = appContext;

	const { storeCookieConsent } = useMemoryController();

	const { isCookiesAccepted } = state.meta;

	const defaultStyle = styles.Container;
	const [componentStyle, setComponentStyle] = useState(defaultStyle);

	const handleAllCookiesAccept = () => {

		const cookiesLevel = constants.COOKIES_LEVELS.MARKETING;

		storeCookieConsent(true, cookiesLevel);
		setComponentStyle(addStylesToClass(styles.Container, [styles.hidden]));

	};

	const handleCookiesReject = () => {

		const cookiesLevel = constants.COOKIES_LEVELS.NONE;

		storeCookieConsent(false, cookiesLevel);
		setComponentStyle(addStylesToClass(styles.Container, [styles.hidden]));

	};

	useEffect(() => {

		if (typeof isCookiesAccepted === 'undefined') {
			return;
		}

		if (isCookiesAccepted) {
			setComponentStyle(addStylesToClass(styles.Container, [styles.hidden]));
		}

	}, [ isCookiesAccepted ]);

	return (

		<div className={componentStyle}>

			<div className={styles.Header}>
				Tämä sivusto käyttää evästeitä.
			</div>

			<div className={styles.Controls}>

				<button
					className={addStylesToClass(styles.CookieButton, [styles.accept])}
					onClick={handleAllCookiesAccept}
				>
					Hyväksy evästeet
				</button>

				<button
					className={addStylesToClass(styles.CookieButton, [styles.reject])}
					onClick={handleCookiesReject}
				>
					Kiellä evästeet
				</button>

			</div>

		</div>

	);

};

export default CookiesConsent;