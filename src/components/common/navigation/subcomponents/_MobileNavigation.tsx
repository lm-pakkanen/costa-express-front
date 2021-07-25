import React, { useContext } from 'react';

import { Brand } from './Links';
import NavLinksLeft from './NavLinksLeft';
import NavLinksRight from './NavLinksRight';
import NavFloater from './NavFloater';

import { NavFloaterToggler } from './NavInputs';

import { appStore } from '../../../../contexts/AppContext';

interface IMobileNavigation {
	enableColorChangeOnScroll?: true
}

// TODO: visible order of links
const MobileNavigation: React.FC<IMobileNavigation> = (props) => {

	const appContext = useContext(appStore);
	const path = appContext.state.meta.path;

	return (
		<>
			<NavLinksLeft>
				<Brand path={path} enableColorChangeOnScroll={props.enableColorChangeOnScroll} />
			</NavLinksLeft>

			<NavLinksRight>

			</NavLinksRight>

			<NavFloater>

				<NavFloaterToggler />

			</NavFloater>
		</>
	);

};

export default MobileNavigation;