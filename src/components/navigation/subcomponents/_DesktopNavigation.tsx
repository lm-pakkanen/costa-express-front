import React, { useContext } from 'react';

import { AboutUs, Brand, Contact, Projects } from './Links';

import { appStore } from '../../../contexts/AppContext';

import NavLinksLeft from './NavLinksLeft';
import NavLinksRight from './NavLinksRight';
import NavFloater from './NavFloater';
import styles from './NavInputs.module.css';

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

				<Projects path={path} />
				<Contact path={path} />

			</NavLinksRight>

			<NavFloater>

				<AboutUs path={path} styles={[styles.FloaterLink]} />

			</NavFloater>
		</>

	);

};

export default DesktopNavigation;