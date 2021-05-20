import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import constants from '../config/constants';

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

	validateContactFormEmail: (email: string) => {

		if (isEmail(email)) {
			return true;
		} else {
			return 'Sähköpostiosoite ei ole kelvollinen.';
		}

	},

	validateContactFormName: (name: string) => {

		if (isEmpty(name)) {
			return 'Kenttä ei voi olla tyhjä.'
		}

		return true;

	},

	validateContactFormMessage: (message: string) => {

		if (isEmpty(message)) {
			return 'Kenttä ei voi olla tyhjä.'
		}

		return true;

	}

};