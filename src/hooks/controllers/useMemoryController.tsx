import { CError, FatalCError } from '../../models/Errors';

import ICError from '../../interfaces/ICError';
import IFatalCError from '../../interfaces/IFatalCError';
import { SupportedLangs } from '../../interfaces/types';

const useMemoryController = () => {

	const setLanguage = (language: SupportedLangs) => {
		localStorage.setItem('harriot-home/language', JSON.stringify(language));
	};
	const getLanguage = (): SupportedLangs | undefined => {
		const data = localStorage.getItem('harriot-home/language');
		if (!data) { return undefined; }
		return JSON.parse(data);
	}


	/** Stores user's cookie consent values */
	const storeCookieConsent = (isCookiesAccepted: boolean, cookiesLevel: number) => {
		const data = { isCookiesAccepted, cookiesLevel };
		localStorage.setItem('harriot-home/user-cookie-data', JSON.stringify(data));
	};
	const getCookieConsent = (): { isCookiesAccepted: boolean, cookiesLevel: number } | undefined => {
		const data = localStorage.getItem('harriot-home/user-cookie-data');
		if (!data) { return undefined; }
		return JSON.parse(data);
	};

	const getJWT = (): string | undefined => {
		const jwt = localStorage.getItem('harriot-home/user-jwt');
		if (!jwt) { return undefined; }
		return JSON.parse(jwt);
	};
	const setJWT = (jwt: string) => {
		localStorage.setItem('harriot-home/user-jwt', JSON.stringify(jwt));
	};
	const clearJWT = () => {
		localStorage.removeItem('harriot-home/user-jwt');
	};

	const getMemoryErrors = (): Array<ICError | IFatalCError> => {

		const errorsString = localStorage.getItem('harriot-home/errors');
		let errors: Array<ICError | IFatalCError> = errorsString ? JSON.parse(errorsString) : [];

		if (errors.length !== 0) {

			errors = errors.map((error: ICError | IFatalCError) => {

				if (error.errorClass === 'CError') {

					let isDisruptive;

					if ('isDisruptive' in error) {
						isDisruptive = error.isDisruptive;
					}

					return new CError(error.message, error.code, isDisruptive, error.name);

				} else {
					return new FatalCError(error.message, error.code, error.name);
				}

			});

		}

		return errors;
	};
	const addMemoryError = (error: ICError | IFatalCError) => {
		let errs = getMemoryErrors();
		errs = errs.concat(error);
		localStorage.setItem('harriot-home/errors', JSON.stringify(errs));
	};
	const clearMemoryErrors = () => {
		localStorage.removeItem('harriot-home/errors');
	};

	return {
		setLanguage,
		getLanguage,
		storeCookieConsent,
		getCookieConsent,
		getJWT,
		setJWT,
		clearJWT,
		getMemoryErrors,
		addMemoryError,
		clearMemoryErrors
	};

};

export default useMemoryController;