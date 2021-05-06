import constants from '../config/constants';

export function validateEmail(email: string) {
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}

export function validateUsername(username: string) {
	const regex = /^[A-Za-z0-9_-ÄäÖöÅå]{2,35}$/;
	return regex.test(username);
}

export function validatePassword(password: string) {

	let regex;

	if (constants.PASSWORD_STRENGTH_LEVEL === 2) {

		/** Require 5 chars, letter, number and special char */
		regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}/;

	} else if (constants.PASSWORD_STRENGTH_LEVEL === 3) {

		/** Require 8 chars, lower & uppercase letter, number and special char */
		regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	} else {

		/** Require 5 chars, letter and number */
		regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

	}

	return regex.test(password);
}

export function emailExists(email: string) {
	// TODO: Call API Controller
}

export function usernameExists(username: string) {
	if (!username) { return; }
	// TODO: Call API Controller
}