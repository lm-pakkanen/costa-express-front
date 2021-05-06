import React, { useContext } from 'react';

import { AboutUs, Brand, Contact, Projects } from './Links';
import NavLinksLeft from './NavLinksLeft';
import NavLinksRight from './NavLinksRight';
import NavFloater from './NavFloater';

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

			<NavLinksRight />

			<NavFloater>

				<Projects path={path} styles={[styles.FloaterLink]} />
				<Contact path={path} styles={[styles.FloaterLink]} />
				<AboutUs path={path} styles={[styles.FloaterLink]} />

			</NavFloater>
		</>
	);

};

export default MobileNavigation;