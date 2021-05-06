import React from 'react';

import FatalError from '../../pages/Errors/FatalError';

import IBoundaryState from '../../interfaces/IBoundaryState';
import ErrorBoundaryController from '../../controllers/ErrorBoundaryController';

import { CError } from '../../models/Errors';

import { AnyError, AnyErrorArray } from '../../interfaces/types';

interface IProps {}

const defaultState = {
	hasError: false,
	shouldDisrupt: true,
	hasFatalError: false,
	errors: []
}

class AppBoundary extends React.Component<IProps, IBoundaryState> {

	constructor(props: IProps) {
		super(props);
		this.state = defaultState;
	}

	static getDerivedStateFromError = (err: AnyError | AnyErrorArray) => {

		if (err instanceof Array) {
			return ErrorBoundaryController.getErrorDataFromArray(err);
		} else {
			return ErrorBoundaryController.getErrorData(err);
		}

	}

	componentDidCatch(err: AnyError | AnyErrorArray, errInfo: React.ErrorInfo) {
		// TODO: Log errors server-side
		ErrorBoundaryController.logErrorsToConsole('App Boundary', err, errInfo);
	}

	render() {

		const {
			hasError,
			shouldDisrupt,
			hasFatalError,
			errors
		} = this.state;

		if (hasError && shouldDisrupt && hasFatalError) {

			const disruptiveErrors = errors.filter((err: AnyError) => {

				if (err instanceof CError) {

					/** Filter out non-disruptive errors */
					if (err.isDisruptive) {
						return err;
					}

				}

				/** Treat other instances of error as disruptive */
				return err;

			});

			return <FatalError errors={disruptiveErrors} />;
		} else {
			return this.props.children;
		}

	}

}

export default AppBoundary;