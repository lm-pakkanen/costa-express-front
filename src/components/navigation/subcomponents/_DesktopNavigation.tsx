import React, { useContext } from 'react';

import { Brand } from './Links';

import { appStore } from '../../../contexts/AppContext';

import NavLinksLeft from './NavLinksLeft';
import NavLinksRight from './NavLinksRight';

// TODO: visible order of links
const DesktopNavigation: React.FC = () => {

	const appContext = useContext(appStore);
	const path = appContext.state.meta.path;

	return (

		<>
			<NavLinksLeft>
				<Brand path={path} />
			</NavLinksLeft>

			<NavLinksRight>

			</NavLinksRight>

		</>

	);

};

export default DesktopNavigation;