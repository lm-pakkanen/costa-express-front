import React, { useContext } from 'react';

import { Brand } from './Links';
import NavLinksLeft from './NavLinksLeft';
import NavLinksRight from './NavLinksRight';
import NavFloater from './NavFloater';

import { NavFloaterToggler } from './NavInputs';

import { appStore } from '../../../contexts/AppContext';

import styles from './NavInputs.module.css';

// TODO: visible order of links
const MobileNavigation: React.FC = () => {

	const appContext = useContext(appStore);
	const path = appContext.state.meta.path;

	return (
		<>
			<NavLinksLeft>
				<Brand path={path} />
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