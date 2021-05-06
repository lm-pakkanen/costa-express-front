import { useContext } from 'react';

import { loginForm } from '../../config/actions';

import { appStore } from '../../contexts/AppContext';

import useMemoryController from '../../hooks/controllers/useMemoryController';
import useAPIController from '../../hooks/controllers/useAPIController';

import { redirectTo } from '../../helpers';

import {
	validateEmail,
	validatePassword,
	validateUsername
} from '../../helpers/Validators';

import { CError, FatalCError } from '../../models/Errors';

import IUserLogin from '../../interfaces/IUserLogin';
import IUserUpdate from '../../interfaces/IUserUpdate';
import IUserRegister from '../../interfaces/IUserRegister';

const useUserController = () => {

	const appContext = useContext(appStore);
	const { dispatch } = appContext;

	const {
		getJWT: memoryGetJWT,
		setJWT: memorySetJWT,
		clearJWT: memoryClearJWT,
		addMemoryError
	} = useMemoryController();

	const {
		callUserVerify,
		callUserRegister,
		callUserLogin,
		callUserUpdate
	} = useAPIController();

	const verifyJWT = async (jwt: string): Promise<boolean> => {

		try {
			return await callUserVerify(jwt);
		} catch (err) {

			const response = err.response;
			const { name } = response.data;

			/** JWT token has expired, throw fatal error */
			if (name && name === 'TokenExpiredError') {

				throw new FatalCError(
					'JWT token has expired',
					401,
					name
				);

			}

			throw new CError(err.message);
		}

	}

	const getJWT = (): string | undefined => {
		return memoryGetJWT();
	};

	const handleRegister = (data: IUserRegister): void => {

		const { email, username, password } = data;

		dispatch({ type: loginForm.clearErrors });

		let isError = false;

		if (!validateEmail(email)) {

			const data = {
				type: loginForm.setRegisterErrorField,
				payload: { errorField: 'email', error: 'Invalid email ' }
			};

			isError = true;
			dispatch(data);
		}

		if (!validateUsername(username)) {

			const data = {
				type: loginForm.setRegisterErrorField,
				payload: { errorField: 'username', error: 'Invalid username ' }
			};

			isError = true;
			dispatch(data);
		}

		if (!validatePassword(password)) {

			const data = {
				type: loginForm.setRegisterErrorField,
				payload: { errorField: 'password', error: 'Invalid password ' }
			};

			isError = true;
			dispatch(data);

		}

		if (isError) { return; }

		dispatch({ type: loginForm.setIsLoading, payload: true });

		callUserRegister({ email, username, password })
			.then(() => {

				callUserLogin({ email, password })
					.then((jwt: string) => {
						memorySetJWT(jwt);
						redirectTo();
					});

			})
			.catch((err: Error) => {

				const error = new CError('Something went wrong. Please try again later.');

				dispatch({ type: loginForm.setLoginError, payload: error });

				const intError = new CError(
					err.message,
					500,
					false
				);

				addMemoryError(intError);

			})
			.finally(() => {
				dispatch({ type: loginForm.setIsLoading, payload: false });
			});
	}

	const handleLogout = (redirectTarget = '/'): void => {
		memoryClearJWT();
		redirectTo(redirectTarget);
	};

	const handleLogin = (data: IUserLogin): void => {

		const { email, password } = data;

		dispatch({ type: loginForm.clearErrors });

		let isError = false;

		if (!validateEmail(email)) {

			const data = {
				type: loginForm.setLoginErrorField,
				payload: { errorField: 'email', error: 'Invalid email ' }
			};

			isError = true;
			dispatch(data);
		}

		if (!validatePassword(password)) {

			const data = {
				type: loginForm.setLoginErrorField,
				payload: { errorField: 'password', error: 'Invalid password ' }
			};

			isError = true;
			dispatch(data);
		}

		if (isError) { return; }

		dispatch({ type: loginForm.setIsLoading, payload: true });

		callUserLogin(data)
			.then((jwt: string | false) => {

				if (!jwt) {

					const error = new CError(
						'Email or password is incorrect.',
						403
					);

					return dispatch({ type: loginForm.setLoginError, payload: error });
				}

				memorySetJWT(jwt);
				redirectTo();

			})
			.catch((err: Error) => {

				const error = new CError('Something went wrong. Please try again later.');

				dispatch({ type: loginForm.setLoginError, payload: error });

				const intError = new CError(
					err.message,
					500,
					false
				);

				addMemoryError(intError);

			})
			.finally(() => {
				dispatch({ type: loginForm.setIsLoading, payload: false });
			});

	}

	const handleUserUpdate = (data: IUserUpdate, jwt: string): void => {

		// TODO: Action types

		const { email, username, password } = data;

		if (!(email && username && password)) {
			dispatch({ type: '', payload: 'No new data to update!' });
		}

		if (email) {
			if (!validateEmail(email)) {
				dispatch({ type: '', payload: 'Invalid email address' });
			}
		}

		if (username) {
			if (!validateUsername(username)) {
				dispatch({ type: '', payload: 'Invalid username' });
			}
		}

		if (password) {
			if (!validatePassword(password)) {
				dispatch({ type: '', payload: 'Invalid password' });
			}
		}

		dispatch({ type: '', payload: true });

		callUserUpdate(data)
			.then(() => {
				handleLogout('/login');
			})
			.catch((err: Error) => {
				dispatch({ type: '', payload: err });
			})
			.finally(() => {
				dispatch({ type: '', payload: false });
			});
	}

	return {
		verifyJWT,
		getJWT,
		handleRegister,
		handleLogin,
		handleLogout,
		handleUserUpdate
	}

}

export default useUserController;