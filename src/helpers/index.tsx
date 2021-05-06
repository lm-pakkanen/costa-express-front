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