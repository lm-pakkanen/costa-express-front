import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isMobilePhone from 'validator/lib/isMobilePhone';

import constants from '../config/constants';

type ValidatorArgument = null | string;

export function redirectTo(target: string = document.referrer) {

	if (window.location.href !== target) {
		window.location.href = target;
	} else {
		window.location.href = constants.BASE_URI;
	}

}

export function addStylesToClass(originStyle: string, styleList: string[]) {

	styleList.forEach((style) => {
		originStyle += ' ' + style;
	});

	return originStyle;

}

const fieldEmptyError = 'Kenttä ei voi olla tyhjä';

export const Validator = {

	validateContactFormEmail: (email: ValidatorArgument) => {

		if (!email) {
			return fieldEmptyError;
		}

		if (!isEmail(email)) {
			return 'Sähköpostiosoite ei ole kelvollinen.';
		}

		return true;
	},

	validateContactFormName: (name: ValidatorArgument) => {

		if (!name || isEmpty(name)) {
			return fieldEmptyError;
		}

		if (name.length > 100) {
			return 'Viesti on liian pitkä.';
		}

		return true;
	},

	validateAddressStreet: (street: ValidatorArgument) => {

		if (!street || isEmpty(street)) {
			return fieldEmptyError;
		}

		if (street.length > 150) {
			return 'Osoite on liian pitkä.'
		}

		return true;

	},

	validateAddressZip: (zip: ValidatorArgument) => {

		if (!zip || isEmpty(zip)) {
			return fieldEmptyError;
		}

		if (zip.length > 150) {
			return 'Osoite on liian pitkä.'
		}

		return true;

	},

	validateAddressCountry: (country: ValidatorArgument) => {

		if (!country || isEmpty(country)) {
			return fieldEmptyError;
		}

		if (country.length > 100) {
			return 'Osoite on liian pitkä.'
		}

		return true;

	},

	validatePhoneNumber: (number: ValidatorArgument) => {

		if (!number) {
			return fieldEmptyError;
		}

		number = number.replace(/\s/g, '');
		number = number.replace('-', '');

		if (!number.startsWith('+') || number.length < 5 || number.length > 40) {
			return "Numero on epäkelpo.";
		}

		return true;

	},

	validateContactFormCargoInformation: (message: ValidatorArgument) => {

		if (!message || isEmpty(message)) {
			return fieldEmptyError;
		}

		if (message.length > 5000) {
			return 'Viesti on liian pitkä.';
		}

		return true;

	},

	validateContactFormMessage: (message: ValidatorArgument) => {

		if (message && !isEmpty(message)) {

			if (message.length > 5000) {
				return 'Viesti on liian pitkä.';
			}

		}

		return true;
	},

};