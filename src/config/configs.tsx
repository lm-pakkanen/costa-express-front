import constants from './constants';

import common_fi from '../_assets/translations/fi/common.json';

export const axiosConfig = {
	baseURL: constants.BASE_API_URI,
	timeout: 1500,
};

export const i18nextConfig = {
	interpolation: {
		escapeValue: false
	},
	lng: 'fi',
	resources: {
		fi: {
			common: common_fi,
		},
		en: {}
	}
};