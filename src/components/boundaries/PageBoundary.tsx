import React from 'react';

import ErrorBoundaryController from '../../controllers/ErrorBoundaryController';

import { CError, FatalCError } from '../../models/Errors';

import ICError from '../../interfaces/ICError';

import { AnyError, AnyErrorArray } from '../../interfaces/types';

interface IProps {}
interface IState {}

class PageBoundary extends React.Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);
		this.state = {};
	}

	static getDerivedStateFromError = (err: AnyError | AnyErrorArray) => {

		if (err instanceof Array) {
			return ErrorBoundaryController.getErrorDataFromArray(err);
		} else {
			return ErrorBoundaryController.getErrorData(err);
		}

	}

	componentDidCatch(err: AnyError | AnyErrorArray, errInfo: React.ErrorInfo) {

		let errors: Array<ICError> = [];
		let nextBoundaryErrors: Array<Error | FatalCError> = [];

		if (err instanceof CError) {
			errors.push(err);
		} else if (err instanceof Array) {

			err.forEach((_err: AnyError) => {

				if (_err instanceof CError) {
					errors.push(_err);
				} else {
					nextBoundaryErrors.push(_err);
				}

			});

		} else {
			nextBoundaryErrors.push(err);
		}

		// TODO: log errors server-side
		if (errors.length !== 0) {
			ErrorBoundaryController.logErrorsToConsole('Page Boundary', errors, errInfo);
		}

		if (nextBoundaryErrors.length !== 0) {

			console.log('Page Boundary encountered a fatal error, throwing to next boundary');

			/** Throw unexpected errors to next boundary */
			throw nextBoundaryErrors;

		}

	}

	render() {
		return this.props.children;
	}

}

export default PageBoundary;