import React from 'react';

import constants from '../../../../config/constants';

import { NavLink } from './NavInputs';

import IImage from '../../../../interfaces/IImage';

import inputStyles from './NavInputs.module.css';
import useScrollStatus from '../../../../hooks/useScrollStatus';

interface ILink {
	path: string,
	style?: string
}

interface IBrand extends ILink {
	enableColorChangeOnScroll?: true;
}


const logoLight: IImage = {
	url:  `${constants.BASE_URI}/img/Logo-light.svg`,
	alt: 'Etusivu',
	title: 'CostaExpress etusivu'
};

const logoDark: IImage = {
	url:  `${constants.BASE_URI}/img/Logo-dark.svg`,
	alt: 'Etusivu',
	title: 'CostaExpress etusivu'
};

export const Brand: React.FC<IBrand> = (props) => {

	const isPageScrolled = useScrollStatus();

	let logo = logoDark;

	if (props.enableColorChangeOnScroll) {

		if (isPageScrolled) {
			logo = logoDark;
		} else {
			logo = logoLight;
		}

	}

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