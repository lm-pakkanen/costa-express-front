import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

import constants from '../../config/constants';

import useMemoryController from './useMemoryController';

import IImage from '../../interfaces/IImage';
import { SupportedLangs } from '../../interfaces/types';

const useLanguageController = () => {

	const { setLanguage: setMemoryLanguage } = useMemoryController();

	const { t: translate, i18n } = useTranslation('common');
	const { t: translateNavigation } = useTranslation('navigation');

	let currentUrl = useLocation().pathname.substr(1);

	const getSupportedLanguages = (): { [key: string]: { [key: string]: IImage } } => {

		return {
			fi: {
				img: {
					url: `${constants.BASE_URI}/img/flags/finland.svg`,
					alt: translate('languageNames.finnish'),
					title: translate('languageNames.finnish')
				}
			}
			,
			en: {
				img: {
					url: `${constants.BASE_URI}/img/flags/britain.svg`,
					alt: translate('languageNames.english'),
					title: translate('languageNames.english')
				}
			}
		};

	}

	const handleLanguageSwitch = (toLang: SupportedLangs) => {

		const currentLanguage = i18n.language as SupportedLangs;
		const currentUrls = i18n.getResourceBundle(currentLanguage, 'navigation').links.urls;

		let toUrlTranslationKey = '';

		/** Find which page user is on */
		Object.keys(currentUrls).forEach((key) => {

			/** Page was found, set key for translating new url */
			if (currentUrls[key] === currentUrl) {
				toUrlTranslationKey = `links.urls.${key}`;
			}

		});

		setMemoryLanguage(toLang);

		/**
		 *  Translate current page URL to new language and redirect
		 *  If current page was not found, redirect to '' -> index page
		 */
		const newSlug = translateNavigation(toUrlTranslationKey, { lng: toLang });
		window.location.href = `${constants.BASE_URI}/${newSlug}`;

	}

	return {
		getSupportedLanguages,
		handleLanguageSwitch
	};

}

export default useLanguageController;