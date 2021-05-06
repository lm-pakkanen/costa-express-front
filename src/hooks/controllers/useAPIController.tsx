import axios from 'axios';

import constants from '../../config/constants';
import { axiosConfig } from '../../config/configs';

import { createAuthorizationHeader, createJWTAuthorizationHeader } from '../../helpers';

import ICError from '../../interfaces/ICError';
import IUserLogin from '../../interfaces/IUserLogin';
import IUserRegister from '../../interfaces/IUserRegister';
import IUserUpdate from '../../interfaces/IUserUpdate';
import IFatalCError from '../../interfaces/IFatalCError';

const _axios = axios.create(axiosConfig);

/** Internal types for API call methods */
type _endpoint = string;
type _params = { [key: string]: any };
type _config =  { [key: string]: any };

const useAPIController = () => {

	const callSendErrors = async (data: Array<ICError | IFatalCError>) => {
		const endpoint = constants.API.ENDPOINTS.ERRORS;
		await callAPIPost(endpoint, data);
	};

	const callUserLogin = async (params: IUserLogin): Promise<string> => {

		const endpoint = constants.API.ENDPOINTS.USER_LOGIN;

		const { email, password } = params;

		const authorization = createAuthorizationHeader(email, password);

		const config = {
			headers: {
				Authorization: authorization
			}
		};

		return await callAPIGet(endpoint, {}, config);

	};

	const callUserRegister = async (data: IUserRegister) => {
		const endpoint = constants.API.ENDPOINTS.USERS;
		await callAPIPost(endpoint, data);
	};

	const callUserVerify = async (jwt: string): Promise<boolean> => {

		const endpoint = constants.API.ENDPOINTS.JWT_VERIFY;

		const config = {
			headers: {
				Authorization: createJWTAuthorizationHeader(jwt)
			}
		};

		return await callAPIGet(endpoint, {}, config);

	};

	const callUserUpdate = async (data: IUserUpdate) => {
		const endpoint = constants.API.ENDPOINTS.USERS;
		await callAPIPut(endpoint, data);
	};

	const callEmailExists = async (email: string) => {

		const endpoint = constants.API.ENDPOINTS.EMAIL_EXISTS;

		const params = {
			email
		};

		return await callAPIGet(endpoint, params);
	};

	const callPasswordExists = async (username: string) => {

		const endpoint = constants.API.ENDPOINTS.USERNAME_EXISTS;

		const params = {
			username
		};

		return await callAPIGet(endpoint, params);
	};

	/** Internal (private) methods */
	const callAPIGet = async (endpoint: _endpoint, params: _params, config?: _config): Promise<any> => {
		const response = await _axios.get(endpoint, { params, ...config });
		return response.data;
	};

	const callAPIPost = async (endpoint: _endpoint, params: _params, config?: _config) => {
		await _axios.post(endpoint, { ...params, ...config });
	};

	const callAPIPut = async (endpoint: _endpoint, params: _params, config?: _config) => {
		await _axios.put(endpoint, { ...params, ...config });
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const callAPIDelete = async (endpoint: _endpoint, params: _params, config?: _config) => {
		await _axios.delete(endpoint, { ...params, ...config });
	};

	return {
		callSendErrors,
		callUserLogin,
		callUserRegister,
		callUserVerify,
		callUserUpdate,
		callEmailExists,
		callPasswordExists
	};

}

export default useAPIController;