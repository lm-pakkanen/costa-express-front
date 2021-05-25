import React from 'react';

import constants from '../../../config/constants';

import { NavLink } from './NavInputs';

import IImage from '../../../interfaces/IImage';

import inputStyles from './NavInputs.module.css';

interface ILink {
	path: string,
	style?: string
}

export const Brand: React.FC<ILink> = () => {

	const logo: IImage = {
		url:  `${constants.BASE_URI}/img/logo.svg`,
		alt: 'CostaExpress etusivu',
		title: 'Etusivu'
	};

	return (
		<NavLink
			id={'navHomeLink'}
			href={new URL('/', constants.BASE_URI)}
			text={'CostaExpress'}
			title={'Etusivu'}
			image={logo}
			style={inputStyles.NavLinkBrand}
		/>
	);

};

export const Contact: React.FC<ILink> = (props) => {

	return (
		<NavLink
			id={'navContactUsLink'}
			href={new URL('ota-yhteytta', constants.BASE_URI)}
			text={'Ota yhteyttä'}
			title={'Ota yhteyttä'}
			isActive={props.path === '/ota-yhteytta'}
			style={props.style}
		/>
	);

};