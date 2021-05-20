import { useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { appStore } from '../contexts/AppContext';
import { meta, navigation } from '../config/actions';

import useMemoryController from '../hooks/controllers/useMemoryController';

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
	const { dispatch, state } = appContext;

	const {
		getCookieConsent,
		getMemoryErrors,
		clearMemoryErrors
	} = useMemoryController();

	const storedCookieConsent = getCookieConsent();

	const { isCookiesAccepted: accepted, cookiesLevel: level } = storedCookieConsent ?? {};

	useEffect(() => {

		if ((typeof accepted === 'undefined' || typeof level === 'undefined')) {
			return;
		}

		dispatch({ type: meta.setCookiesAccepted, payload: { accepted, level } });


	}, [ accepted, level, dispatch ]);

	/** Sets path to state */
	useEffect(() => {
		dispatch({ type: meta.setPath, payload: path });
	}, [ dispatch, path ]);

	const stateIsScrolled = state.meta.viewport.isScrolled;

	/** Handles scroll event */
	useEffect(() => {

		const handleScroll = () => {

			const isScrolled = window.scrollY !== 0;

			if (isScrolled !== stateIsScrolled) {
				dispatch({ type: meta.setScrolledStatus, payload: isScrolled });
			}

		};

		handleScroll();

		document.addEventListener('scroll', handleScroll);

		return () => {
			document.removeEventListener('scroll', handleScroll);
		};

	}, [ stateIsScrolled, dispatch ]);

	/** Throws errors from memory to appBoundary */
	function getErrors() {
		const errors = getMemoryErrors();

		if (errors.length !== 0) {
			clearMemoryErrors();
			throw errors;
		}
	}
	getErrors();

	/** Handles resize events */
	useEffect(() => {

		const handleResize = () => {

			let deviceType = 'desktop';

			/** Set device type based in window inner width */
			if (state.meta.viewport.mobile_width && state.meta.viewport.tablet_width) {

				const mobile: number = state.meta.viewport.mobile_width;
				const tablet: number= state.meta.viewport.tablet_width;

				if (window.innerWidth <= mobile) {
					deviceType = 'mobile';
				} else if (window.innerWidth <= tablet) {
					deviceType = 'tablet';
				}

			}

			if (state.meta.viewport.deviceType !== deviceType) {
				dispatch({ type: navigation.toggleFloater, payload: false });
			}

			return dispatch({ type: meta.setDeviceType, payload: deviceType});

		};

		handleResize();

		let stall: ReturnType<typeof setTimeout>;

		const func = () => {
			clearTimeout(stall);
			stall = setTimeout(handleResize, 20);
		};

		window.addEventListener('resize', func);

		return () => {
			window.removeEventListener('resize', func);
		}

	}, [
		dispatch,
		state.meta.viewport.deviceType,
		state.meta.viewport.mobile_width,
		state.meta.viewport.tablet_width
	]);

};

export const useStoreConfigure = async () => {

	useMetaConfigure();

	return useNavConfigure();

};