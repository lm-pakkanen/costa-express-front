import constants from './constants';

import common_fi from '../_assets/translations/fi/common.json';
import navigation_fi from '../_assets/translations/fi/navigation.json';
import pages_fi from '../_assets/translations/fi/pages.json';

import common_en from '../_assets/translations/en/common.json';
import navigation_en from '../_assets/translations/en/navigation.json';
import pages_en from '../_assets/translations/en/pages.json';

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
			navigation: navigation_fi,
			pages: pages_fi
		},
		en: {
			common: common_en,
			navigation: navigation_en,
			pages: pages_en
		}
	}
};