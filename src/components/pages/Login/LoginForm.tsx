import React, { useContext } from 'react';

import { loginStore } from '../../../contexts/LoginFormContext';
import { loginForm } from '../../../config/actions';

import useUserController from '../../../hooks/controllers/useUserController';

import { useCallbackOnEnter } from '../../../hooks/useCallbackOnEnter';
import useThrowMemoryErrors from '../../../hooks/useThrowMemoryErrors';

import FormContainer from './FormContainer';

import styles from './LoginForm.module.css';

interface IProps {}

const LoginForm: React.FC<IProps> = () => {

	const loginContext = useContext(loginStore);
	const { state, dispatch } = loginContext;

	const login = state.login;

	const { handleLogin } = useUserController();

	const handleSubmit = () => {

		const email = login.email.value;
		const password = login.password.value;

		handleLogin({ email, password });

	};

	useCallbackOnEnter(handleSubmit);
	useThrowMemoryErrors();

	return (

		<FormContainer form={{ id:'login' }}>

			<div className={styles.LoginForm}>

				<fieldset>

					<div className={styles.InputWrapper}>
						<div>
							<label className={styles.InputLabel}>
								Email
							</label>

							<input type={'text'}
							       className={styles.Input}
							       value={login.email.value}
							       placeholder={'Email address'}
							       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

								       const field = 'email';
								       const value = e.target.value;

								       dispatch({ type: loginForm.updateLoginFieldValue, payload: { field, value } });

							       }}
							/>
						</div>
					</div>

					{ login.email.error && login.email.error }

					<div className={styles.InputWrapper}>
						<div>
							<label className={styles.InputLabel}>
								Password
							</label>

							<input type={'password'}
							       className={styles.Input}
							       value={login.password.value}
							       placeholder={'Password'}
							       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

								       const field = 'password';
								       const value = e.target.value;

								       dispatch({ type: loginForm.updateLoginFieldValue, payload: { field, value } });

							       }}
							/>
						</div>
					</div>

					{ login.password.error && login.password.error }

					{ login && login.error && login.error.message }

					<div className={styles.InputWrapper}>
						<div>
							<input type={'button'}
							       className={styles.ToggleFormButton}
							       value={'Don\'t have an account yet?'}
							       onClick={() => {
								       dispatch({ type: loginForm.toggleFormType });
							       }}
							/>
						</div>
					</div>

				</fieldset>


				<div className={styles.InputWrapper}>
					<div>
						<input type={'button'}
						       className={styles.SubmitButton}
						       value={'Log in to License Manager'}
						       onClick={handleSubmit}
						/>
					</div>
				</div>

			</div>

		</FormContainer>

	);

};

export default LoginForm;