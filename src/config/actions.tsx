const prefixes = {
	meta: 'meta',
	authentication: 'authentication',
	navigation: 'navigation',
	loginForm: 'login-form',
	language: 'language'
};

export const meta: { [key: string]: string } = {
	setPath: `${prefixes.meta}/set-path`,
	setCookiesAccepted: `${prefixes.meta}/set-cookies-accepted`,
	setDeviceType: `${prefixes.meta}/set-device-type`,
	setScrolledStatus: `${prefixes.meta}/set-scrolled-status`,
	setError: `${prefixes.meta}/set-error`,
	clearErrors: `${prefixes.meta}/clear-errors`
};

export const authentication: { [key: string]: string } = {
	setSessionUser: `${prefixes.authentication}/set-session-user`,
	login: `${prefixes.authentication}/login`,
	register: `${prefixes.authentication}/register`,
};

export const navigation: { [key: string]: string } = {
	toggleFloater: `${prefixes.navigation}/toggle-floater`,
	setRefs: `${prefixes.navigation}/set-refs`
};

export const loginForm: { [key: string]: string } = {
	setIsLoading: `${prefixes.loginForm}/set-is-loading`,
	toggleFormType: `${prefixes.loginForm}/toggle-form-type`,
	updateLoginFieldValue: `${prefixes.loginForm}/update-login-field-value`,
	updateRegisterFieldValue: `${prefixes.loginForm}/update-register-field-value`,
	setLoginError: `${prefixes.loginForm}/set-login-error`,
	setRegisterError: `${prefixes.loginForm}/set-register-error`,
	setLoginErrorField: `${prefixes.loginForm}/set-login-error-field`,
	setRegisterErrorField: `${prefixes.loginForm}/set-register-error-field`,
	clearErrors: `${prefixes.loginForm}/clear-errors`
}

export const language: { [key: string]: string } = {
	setLanguage: `${prefixes.language}/set-language`
}