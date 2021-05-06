import { CError, FatalCError } from '../../models/Errors';

import ICError from '../../interfaces/ICError';
import IFatalCError from '../../interfaces/IFatalCError';

const useMemoryController = () => {

	/** Stores user's cookie consent values */
	const storeCookieConsent = (isCookiesAccepted: boolean, cookiesLevel: number) => {
		const data = { isCookiesAccepted, cookiesLevel };
		localStorage.setItem('costaexpress/user-cookie-data', JSON.stringify(data));
	};
	const getCookieConsent = (): { isCookiesAccepted: boolean, cookiesLevel: number } | undefined => {
		const data = localStorage.getItem('costaexpress/user-cookie-data');
		if (!data) { return undefined; }
		return JSON.parse(data);
	};

	const getMemoryErrors = (): Array<ICError | IFatalCError> => {

		const errorsString = localStorage.getItem('costaexpress/errors');
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
		localStorage.setItem('costaexpress/errors', JSON.stringify(errs));
	};
	const clearMemoryErrors = () => {
		localStorage.removeItem('costaexpress/errors');
	};

	return {
		storeCookieConsent,
		getCookieConsent,
		getMemoryErrors,
		addMemoryError,
		clearMemoryErrors
	};

};

export default useMemoryController;