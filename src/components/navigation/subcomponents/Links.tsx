import React from 'react';

import constants from '../../../config/constants';

import { NavLink } from './NavInputs';

import IImage from '../../../interfaces/IImage';

import inputStyles from './NavInputs.module.css';

interface ILink {
	path: string,
	styles?: string[]
}

export const Brand: React.FC<ILink> = (props) => {

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
			isActive={props.path === '/'}
			image={logo}
			styles={[inputStyles.NavLinkBrand]}
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
			isActive={props.path === 'ota-yhteytta'}
			styles={props.styles}
		/>
	);

};