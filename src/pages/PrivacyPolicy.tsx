import React from 'react';

import PageBoundary from '../components/boundaries/PageBoundary';
import Page from '../components/pages/Page';
import SubPage from '../components/pages/SubPage';

import styles from './PrivacyPolicy.module.css';

interface IProps {}

const PrivacyPolicy: React.FC<IProps> = () => {

	return (
		<PageBoundary>

			<Page style={styles.PrivacyPolicy}>

				<SubPage>

					<div className={styles.Container}>

						<div className={styles.Title}>
							Tietosuoja
						</div>

					</div>

				</SubPage>

			</Page>

		</PageBoundary>
	);

};

export default PrivacyPolicy;