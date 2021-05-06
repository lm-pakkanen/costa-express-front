import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { appStore } from '../contexts/AppContext';

import useUserController from '../hooks/controllers/useUserController';
import useMemoryController from '../hooks/controllers/useMemoryController';

import { FatalCError } from '../models/Errors';

import { AnyCustomError } from '../interfaces/types';

interface Props {
	path: string,
	component: any,
	exact: boolean
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {

	const appContext = useContext(appStore);
	const { state } = appContext;

	const { verifyJWT } = useUserController();
	const { addMemoryError } = useMemoryController();

	const [isVerified, setIsVerified] = useState(false);
	const [isEffectCompleted, setIsEffectCompleted] = useState(false);


	useEffect(() => {

		if (!state.authentication.jwt) { return setIsVerified(false); }

		verifyJWT(state.authentication.jwt)
			.then((verified: boolean) => {
				setIsVerified(verified);
			})
			.catch((err: AnyCustomError) => {

				/** User's JWT token expired, set isVerified to false */
				if (err.code === 401 && err.name === 'TokenExpiredError') {

					// TODO: Write message to memory
					setIsEffectCompleted(true);
					return setIsVerified(false);

				}

				const error = new FatalCError(
					'Could not verify user JWT token due to internal error.',
					401
				);

				addMemoryError(error);

				setIsEffectCompleted(true);

			});

	}, [ verifyJWT, state.authentication.jwt ]);

	return (
		<Route { ...rest } render={() => {

			if (isVerified) {
				return <Component />;
			} else {

				if (isEffectCompleted) {
					return <Redirect to={{ pathname: '/' }} />
				} else {
					// TODO: Proper component
					return <>loading...</>;
				}

			}
		}}
		/>
	);
}

export default ProtectedRoute;