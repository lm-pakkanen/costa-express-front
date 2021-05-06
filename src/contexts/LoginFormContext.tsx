import React, { createContext, useReducer } from 'react';

import { loginForm } from '../config/actions';

import ILoginFormState from '../interfaces/ILoginFormState';

interface Props {}

interface IAction {
	type: string,
	payload?: any
}

const iniState: ILoginFormState = {

	formType: 'login',

	isLoading: false,

	login: {
		email: {
			value: '',
			error: undefined
		},
		password: {
			value: '',
			error: undefined
		},
		error: undefined
	},

	register: {
		email: {
			value: '',
			error: undefined
		},
		username: {
			value: '',
			error: undefined
		},
		password: {
			value: '',
			error: undefined
		},
		error: undefined
	}
}

const loginStore = createContext<any>(iniState);
const { Provider } = loginStore;

const LoginFormProvider: React.FC<Props> = (props) => {
	const [state, dispatch] = useReducer(loginFormReducer, iniState);
	return <Provider value={{ state, dispatch }}>{props.children}</Provider>
}

const loginFormReducer = (state: ILoginFormState, action: IAction) => {

	switch (action.type) {

		case loginForm.setIsLoading:

			const status = action.payload;

			return {
				...state,
				isLoading: status
			};

		case loginForm.toggleFormType:

			const formType = state.formType === 'login' ? 'register' : 'login';

			return {
				...state,
				formType
			}

		case loginForm.updateLoginFieldValue:

			const { field: loginField, value: loginValue } = action.payload;

			return {
				...state,
				login: {
					...state.login,
					[loginField]: {
						...state.login[loginField],
						value: loginValue
					}
				}
			};

		case loginForm.updateRegisterFieldValue:

			const { field: registerField, value: registerValue } = action.payload;

			return {
				...state,
				register: {
					...state.register,
					[registerField]: {
						...state.register[registerField],
						value: registerValue
					}
				}
			};

		case loginForm.setLoginError:

			return {
				...state,
				login: {
					...state.login,
					error: action.payload
				}
			};

		case loginForm.setRegisterError:

			return {
				...state,
				register: {
					...state.register,
					error: action.payload
				}
			};

		case loginForm.setLoginErrorField:

			const { errorField: loginErrorField, error: loginError } = action.payload;

			return {
				...state,
				login: {
					...state.login,
					[loginErrorField]: {
						...state.login[loginErrorField],
						error: loginError
					}
				}
			};

		case loginForm.setRegisterErrorField:

			const { errorField: registerErrorField, error: registerError } = action.payload;

			return {
				...state,
				register: {
					...state.register,
					[registerErrorField]: {
						...state.register[registerErrorField],
						error: registerError
					}
				}
			};

		case loginForm.clearErrors:

			return {
				...state,
				login: {
					...state.login,
					email: {
						...state.login.email,
						error: undefined
					},
					password: {
						...state.login.password,
						error: undefined
					},
					error: undefined
				},
				register: {
					...state.register,
					email: {
						...state.register.email,
						error: undefined
					},
					username: {
						...state.register.username,
						error: undefined
					},
					password: {
						...state.register.password,
						error: undefined
					},
					error: undefined
				}
			};

		default:
			return state;

	}

}

export { loginStore, LoginFormProvider };