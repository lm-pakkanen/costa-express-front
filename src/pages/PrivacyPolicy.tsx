import React from 'react';
import { useTranslation } from 'react-i18next';

import pagesTranslations from '../_assets/translations/fi/pages.json';

import PageBoundary from '../components/boundaries/PageBoundary';
import Page from '../components/pages/Page';
import SubPage from '../components/pages/SubPage';

import styles from './PrivacyPolicy.module.css';

interface IProps {}

interface IFields {
	sectionKey: any
}

const PrivacyPolicy: React.FC<IProps> = () => {

	const { t: translatePages } = useTranslation('pages');

	const Content: React.FC = () => {

		const sections: any = pagesTranslations.privacyPolicy.sections;

		const Fields: React.FC<IFields> = (props) => {


			return (
				<div>
					{
						Object.keys(sections[props.sectionKey].fields).map((_key) => {
							return (
								<div key={_key}>
									{ translatePages(`privacyPolicy.sections.${props.sectionKey}.fields.${_key}`) }
								</div>
							)
						})
					}
				</div>
			)
		}

		return (
			<ul>

				{
					Object.keys(sections).map((key) => (
						<li key={key}>

							{ translatePages(`privacyPolicy.sections.${key}.title`) }

							<Fields sectionKey={key} />

						</li>
					))
				}

			</ul>
		);

	};

	return (
		<PageBoundary>

			<Page style={styles.PrivacyPolicy}>

				<SubPage>

					<div className={styles.Container}>

						<div className={styles.Title}>
							{ translatePages('privacyPolicy.title')}
						</div>

						<Content />

					</div>

				</SubPage>

			</Page>

		</PageBoundary>
	);

};

export default PrivacyPolicy;