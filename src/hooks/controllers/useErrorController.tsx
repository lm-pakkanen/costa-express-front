import { useContext } from 'react';

import { appStore } from '../../contexts/AppContext';

import useAPIController from '../../hooks/controllers/useAPIController';

import { FatalCError } from '../../models/Errors';

import ICError from '../../interfaces/ICError';
import IFatalCError from '../../interfaces/IFatalCError';

const useErrorController = () => {

	const appContext = useContext(appStore);
	const { state } = appContext;

	const {
		callSendErrors
	} = useAPIController();

	const handleErrors = (errors: Array<ICError | IFatalCError>) => {
		callSendErrors(errors).then(() => {}).catch((error) => {});
	};

	const getErrors = (): Array<ICError | IFatalCError> => {
		return state.meta.errors;
	};

	const getFatalErrors = (): Array<IFatalCError> => {

		const errors = getErrors();

		let fatalErrors: Array<IFatalCError> = [];

		if (errors) {

			fatalErrors = errors.filter((error): error is FatalCError =>
				                            error instanceof FatalCError
			);

		}

		return fatalErrors;
	};

	return {
		handleErrors,
		getErrors,
		getFatalErrors
	};

}

export default useErrorController;