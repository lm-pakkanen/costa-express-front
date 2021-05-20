import isEmail from 'validator/lib/isEmail';

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

	validateEmail: (email: string) => {

		if (isEmail(email)) {
			return true
		} else {
			return 'Sähköpostiosoite ei ole kelvollinen.'
		}

	},

};