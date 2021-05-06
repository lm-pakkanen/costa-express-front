import constants from '../config/constants';

import IAppState from '../interfaces/IAppState';

const AppContextState: IAppState = {

	meta: {

		path: '',

		isCookiesAccepted: false,
		cookiesLevel: constants.COOKIES_LEVELS.NONE,

		viewport: {
			isScrolled: undefined,
			deviceType: 'desktop',
			tablet_width: 850,
			mobile_width: 600
		},

		errors: [],

		language: 'fi'

	},

	navigation: {
		refs: [],
		isFloaterVisible: false,
	}

};

// TODO: Fetch defaults from constants

export default AppContextState;