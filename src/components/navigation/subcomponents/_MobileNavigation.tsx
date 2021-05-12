import React, { useContext } from 'react';

import { Brand, Contact } from './Links';
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

				<Contact path={path} />

			</NavLinksRight>

			<NavFloater>

				<NavFloaterToggler />
				<Contact path={path} styles={[styles.FloaterLink]} />

			</NavFloater>
		</>
	);

};

export default MobileNavigation;