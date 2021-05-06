import React from 'react';
import { useTranslation } from 'react-i18next';

import constants from '../../../config/constants';

import { NavLink } from './NavInputs';

import IImage from '../../../interfaces/IImage';

import inputStyles from './NavInputs.module.css';

interface ILink {
	path: string,
	styles?: string[]
}

/** Utility for converting translation to path */
const getPath = (page: string) => {
	return `/${page}`;
};

export const Brand: React.FC<ILink> = (props) => {

	const { t: translate } = useTranslation('navigation');

	const logo: IImage = {
		url:  `${constants.BASE_URI}/img/logo.svg`,
		alt: 'Harriot Software',
		title: translate('links.titles.brand')
	};

	return (
		<NavLink
			id={'navHomeLink'}
			href={new URL('/', constants.BASE_URI)}
			text={'Harriot Software'}
			title={translate('links.titles.brand')}
			isActive={props.path === '/'}
			image={logo}
			styles={[inputStyles.NavLinkBrand]}
		/>
	);

}

export const Support: React.FC<ILink> = (props) => {

	const { t: translate } = useTranslation('navigation');

	return (
		<NavLink
			id={'navSupportLink'}
			href={new URL(getPath(translate('links.urls.support')), constants.BASE_URI)}
			text={translate('links.texts.support').toString()}
			title={translate('links.titles.support')}
			isActive={props.path === getPath(translate('links.urls.support'))}
			styles={props.styles}
		/>
	);

}

export const Projects: React.FC<ILink> = (props) => {

	const { t: translate } = useTranslation('navigation');

	return (
		<NavLink
			id={'navProjectsLink'}
			href={new URL(getPath(translate('links.urls.projects')), constants.BASE_URI)}
			text={translate('links.texts.projects').toString()}
			title={translate('links.titles.projects')}
			isActive={props.path === getPath(translate('links.urls.projects'))}
			styles={props.styles}
		/>
	);

}

export const Contact: React.FC<ILink> = (props) => {

	const { t: translate } = useTranslation('navigation');

	return (
		<NavLink
			id={'navContactUsLink'}
			href={new URL(getPath(translate('links.urls.contact')), constants.BASE_URI)}
			text={translate('links.texts.contact').toString()}
			title={translate('links.titles.contact')}
			isActive={props.path === getPath(translate('links.urls.contact'))}
			styles={props.styles}
		/>
	);

}

export const AboutUs: React.FC<ILink> = (props) => {

	const { t: translate } = useTranslation('navigation');

	return (
		<NavLink
			id={'navAboutUsLink'}
			href={new URL(getPath(translate('links.urls.about')), constants.BASE_URI)}
			text={translate('links.texts.about').toString()}
			title={translate('links.titles.about')}
			isActive={props.path === getPath(translate('links.urls.about'))}
			styles={props.styles}
		/>
	)

}