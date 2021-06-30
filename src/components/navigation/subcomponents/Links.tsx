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
		alt: 'Etusivu',
		title: 'CostaExpress etusivu'
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