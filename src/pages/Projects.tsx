import React from 'react';

import PageBoundary from '../components/boundaries/PageBoundary';

import Page from '../components/pages/Page';
import SubPage from '../components/pages/SubPage';

import styles from './Projects.module.css';

interface IProps {}

const Projects: React.FC<IProps> = (props) => {
	return (

		<PageBoundary>

			<Page style={styles.Projects}>

				<SubPage>

				</SubPage>

				<SubPage>

				</SubPage>

			</Page>

		</PageBoundary>

	);
}

export default Projects;