const prefixes = {
	meta: 'meta',
	navigation: 'navigation',
};

export const meta: { [key: string]: string } = {
	setPath: `${prefixes.meta}/set-path`,
	setCookiesAccepted: `${prefixes.meta}/set-cookies-accepted`,
	setError: `${prefixes.meta}/set-error`,
	clearErrors: `${prefixes.meta}/clear-errors`
};

export const navigation: { [key: string]: string } = {
	toggleFloater: `${prefixes.navigation}/toggle-floater`,
	setRefs: `${prefixes.navigation}/set-refs`
};