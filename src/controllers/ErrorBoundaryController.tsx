import React from 'react';

import { CError, FatalCError } from '../models/Errors';

import IBoundaryState from '../interfaces/IBoundaryState';
import ICError from '../interfaces/ICError';
import IFatalCError from '../interfaces/IFatalCError';
import { AnyError, AnyErrorArray } from '../interfaces/types';

class ErrorBoundaryController {

	static logErrorsToConsole(sourceBoundary: string, err: AnyError | AnyErrorArray, errInfo: React.ErrorInfo) {
		console.log(`${sourceBoundary} has encountered an error.`);
		console.log('   List of errors: \n', err);
		console.log('   Error component stack: \n', errInfo.componentStack)
	}

	static getErrorData(err: AnyError): IBoundaryState {

		let hasError = true, shouldDisrupt, hasFatalError, error;

		if (err instanceof CError) {

			shouldDisrupt = err.isDisruptive;
			hasFatalError = false;

			error = err;

		} else if (err instanceof FatalCError) {

			shouldDisrupt = true;
			hasFatalError = true;

			error = err;

		} else {

			shouldDisrupt = true;
			hasFatalError = true;

			error = new FatalCError(err.message);

		}

		const errors = [
			error
		];

		return {
			hasError,
			shouldDisrupt,
			hasFatalError,
			errors
		}

	}

	static getErrorDataFromArray(errs: AnyErrorArray): IBoundaryState {

		let hasError = true, shouldDisrupt = false, hasFatalError = false;

		let errors: Array<ICError | IFatalCError> = [];

		errs.forEach((err: AnyError) => {

			const response = this.getErrorData(err);

			errors = errors.concat(response.errors);

			/**
			 * One of errors already posesses values
			 * No need to check others
			 */
			if (shouldDisrupt && hasFatalError) {
				return;
			}

			if (!shouldDisrupt && response.shouldDisrupt) {
				shouldDisrupt = true;
			}

			if (!hasFatalError && response.hasFatalError) {
				hasFatalError = true;
			}

		});

		return {
			hasError,
			shouldDisrupt,
			hasFatalError,
			errors
		}

	}

}

export default ErrorBoundaryController;