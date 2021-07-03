import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

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

export const Validator = {

	validateContactFormEmail: (email: ValidatorArgument) => {

		if (!email) {
			return 'Kenttä ei voi olla tyhjä.';
		}

		if (!isEmail(email)) {
			return 'Sähköpostiosoite ei ole kelvollinen.';
		}

		return true;
	},

	validateContactFormName: (name: ValidatorArgument) => {

		if (!name || isEmpty(name)) {
			return 'Kenttä ei voi olla tyhjä.'
		}

		return true;
	},

	validateContactFormMessage: (message: ValidatorArgument) => {

		if (!message || isEmpty(message)) {
			return 'Kenttä ei voi olla tyhjä.'
		}

		return true;
	}

};