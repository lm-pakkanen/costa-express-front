import React, { useContext } from 'react';

import { Brand } from './Links';

import { appStore } from '../../../../contexts/AppContext';

import NavLinksLeft from './NavLinksLeft';
import NavLinksRight from './NavLinksRight';

interface IDesktopNavigation {
	enableColorChangeOnScroll?: true;
}

// TODO: visible order of links
const DesktopNavigation: React.FC<IDesktopNavigation> = (props) => {

	const appContext = useContext(appStore);
	const path = appContext.state.meta.path;

	return (

		<>
			<NavLinksLeft>
				<Brand path={path} enableColorChangeOnScroll={props.enableColorChangeOnScroll} />
			</NavLinksLeft>

			<NavLinksRight>

			</NavLinksRight>

		</>

	);

};

export default DesktopNavigation;