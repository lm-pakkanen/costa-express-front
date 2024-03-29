import { useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { appStore } from '../contexts/AppContext';
import { meta, navigation } from '../config/actions';

import useMemoryController from '../hooks/controllers/useMemoryController';
import constants from '../config/constants';

const useNavConfigure = () => {

	const { dispatch } = useContext(appStore);

	// TODO: Fix useClickedOutsideOf. Currently out of use.
	/**
	const navigationRefList = [
		navigationFloaterRef,
		navigationFloaterTogglerRef
	];
	const isNavigationClickedOutsideOf = useClickedOutsideOf(navigationRefList);
	 useEffect(() => {
		if (isNavigationClickedOutsideOf && state.navigation.isFloaterVisible) {
			dispatch({ type: 'navigation/toggle_floater', payload: false });
		}
	});
	*/

	const navigationFloaterRef = useRef(null);
	const navigationFloaterTogglerRef = useRef(null);

	/** Sets navigation Refs */
	useEffect(() => {

		const navigationRefs = {
			floaterRef: navigationFloaterRef,
			togglerRef: navigationFloaterTogglerRef
		};

		dispatch({ type: navigation.setRefs, payload: navigationRefs });

	}, [ dispatch ]);

};

const useMetaConfigure = () => {

	const path = useLocation().pathname;

	const appContext = useContext(appStore);
	const { dispatch } = appContext;

	const {
		getCookieConsent,
		getMemoryErrors,
		clearMemoryErrors
	} = useMemoryController();

	const storedCookieConsent = getCookieConsent();

	let isCookiesAccepted: boolean, cookiesLevel: number;

	if (!storedCookieConsent) {
		isCookiesAccepted = false;
		cookiesLevel = constants.COOKIES_LEVELS.NONE;
	} else {
		isCookiesAccepted = storedCookieConsent.isCookiesAccepted;
		cookiesLevel = storedCookieConsent.cookiesLevel;
	}

	useEffect(() => {

		dispatch({ type: meta.setCookiesAccepted, payload: { accepted: isCookiesAccepted, level: cookiesLevel } });


	}, [ isCookiesAccepted, cookiesLevel, dispatch ]);

	/** Sets path to state */
	useEffect(() => {
		dispatch({ type: meta.setPath, payload: path });
	}, [ dispatch, path ]);


	/** Throws errors from memory to appBoundary */
	function getErrors() {
		const errors = getMemoryErrors();

		if (errors.length !== 0) {
			clearMemoryErrors();
			throw errors;
		}
	}
	getErrors();

};

export const useStoreConfigure = async () => {

	useMetaConfigure();

	return useNavConfigure();

};