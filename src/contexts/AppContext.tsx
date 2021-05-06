import React, { createContext, useReducer } from 'react';

import { meta, navigation } from '../config/actions';

import AppContextState from './../models/AppContextState';
import { CError } from '../models/Errors';

import IAppState from './../interfaces/IAppState';
import IStoreAction from './../interfaces/IStoreAction';
import ICError from './../interfaces/ICError';
import IFatalCError from '../interfaces/IFatalCError';

interface Props {}

const appStore = createContext<any>(AppContextState);

const { Provider } = appStore;

const AppContextProvider: React.FC<Props> = (props) => {

	const [state, dispatch] = useReducer(appContextReducer, AppContextState);

	function appContextReducer(state: IAppState, action: IStoreAction) {

		switch (action.type) {

			case meta.setPath:

				return {
					...state,
					meta: {
						...state.meta,
						path: action.payload
					}
				};

			case meta.setCookiesAccepted:

				const { accepted: isCookiesAccepted, level: cookiesLevel } = action.payload;

				return {
					...state,
					meta: {
						...state.meta,
						isCookiesAccepted,
						cookiesLevel
					}
				};

			case meta.setDeviceType:

				const deviceType: 'desktop' | 'tablet' | 'mobile' = action.payload;

				return {
					...state,
					meta: {
						...state.meta,
						viewport: {
							...state.meta.viewport,
							deviceType: deviceType
						}
					}
				};

			case meta.setScrolledStatus:

				const isScrolled = action.payload;

				return {
					...state,
					meta: {
						...state.meta,
						viewport: {
							...state.meta.viewport,
							isScrolled
						}
					}
				};

			case meta.clearErrors:

				return {
					...state,
					meta: {
						...state.meta,
						errors: []
					}
				};

			case meta.setError:

				const newError: CError = action.payload;

				let stateErrors: Array<ICError | IFatalCError> = state.meta.errors;

				stateErrors = stateErrors.concat(newError);

				/** Filter out identical errors */
				stateErrors.filter((error) => error === newError);

				return {
					...state,
					meta : {
						...state.meta,
						errors: stateErrors
					}

				};

			case navigation.toggleFloater:

				let isFloaterVisible = state.navigation.isFloaterVisible;

				if (typeof action.payload !== 'undefined') {
					isFloaterVisible = action.payload;
				} else {
					isFloaterVisible = !isFloaterVisible;
				}

				return {
					...state,
					navigation: {
						...state.navigation,
						isFloaterVisible
					}
				};

			case navigation.setRefs:

				const refs = action.payload;

				return {
					...state,
					navigation: {
						...state.navigation,
						refs
					}
				};

			default:
				return state;

		}
	}

	return <Provider value={{ state, dispatch }}>{props.children}</Provider>
}

export { appStore, AppContextProvider };