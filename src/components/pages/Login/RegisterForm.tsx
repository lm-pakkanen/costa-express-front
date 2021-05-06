import React, { useContext } from 'react';

import { loginForm } from '../../../config/actions';
import { loginStore } from '../../../contexts/LoginFormContext';

import useUserController from '../../../hooks/controllers/useUserController';

import FormContainer from './FormContainer';

interface IProps {}

const RegisterForm: React.FC<IProps> = () => {

	const { dispatch, state } = useContext(loginStore);
	const { register } = state;

	const { handleRegister } = useUserController();

	const handleSubmit = () => {

		const email = register.email.value;
		const username = register.username.value;
		const password = register.password.value;

		handleRegister({ email, username, password });

	};

	return (
		<FormContainer form={{ id:'register' }}>

			<fieldset>

				<label htmlFor={'register_email'}>
					Email
				</label>

				<input type={'text'}
				       name={'register_email'}
				       value={register.email.value}
				       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

					       const field = 'email';
					       const value = e.target.value;

					       dispatch({ type: loginForm.updateRegisterFieldValue, payload: { field, value } });

				       }}
				/>

				{ register.email.error && register.email.error }

				<label htmlFor={'register_username'}>
					Username
				</label>

				<input type={'text'}
				       name={'register_username'}
				       value={register.username.value}
				       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

					       const field = 'username';
					       const value = e.target.value;

					       dispatch({ type: loginForm.updateRegisterFieldValue, payload: { field, value } });

				       }}
				/>

				{ register.username.error && register.username.error }

				<label htmlFor={'register_password'}>
					Password
				</label>

				<input type={'password'}
				       name={'register_password'}
				       value={register.password.value}
				       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

					       const field = 'password';
					       const value = e.target.value;

					       dispatch({ type: loginForm.updateRegisterFieldValue, payload: { field, value } });

				       }}
				/>

				{ register.password.error && register.password.error }

				<input type={'button'}
				       value={'Already have an account?'}
				       onClick={() => {
				       	dispatch({ type: loginForm.toggleFormType });
				       }}
				/>

			</fieldset>

			{ register.registerError && register.registerError }

			<input type={'button'}
			       value={'Create a new License Manager account'}
			       onClick={handleSubmit}
			/>

		</FormContainer>
	);

};

export default RegisterForm;