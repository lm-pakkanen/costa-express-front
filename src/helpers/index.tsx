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

export function createAuthorizationHeader(firstVal: string, secondVal: string, type: 'Basic' | 'Bearer' = 'Basic') {

	let token = firstVal + ':' + secondVal;
	token = btoa(token);

	return `${type} ${token}`;

}

export function createJWTAuthorizationHeader(jwt: string, type: 'Basic' | 'Bearer' = 'Bearer') {
	return `${type} ${jwt}`;
}

export function parseJwt(jwt: string) {
	if (!jwt) { return; }
	const base64Url = jwt.split('.')[1];
	const base64 = base64Url.replace('-', '+').replace('_', '/');
	return JSON.parse(window.atob(base64));
}