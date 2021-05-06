import React from 'react';
import { useTranslation } from 'react-i18next';

import constants from '../../config/constants';

import Page from '../../components/pages/Page';

import ICError from '../../interfaces/ICError';
import IFatalCError from '../../interfaces/IFatalCError';

import pagesTranslations from '../../_assets/translations/fi/pages.json';

import styles from './FatalError.module.css';

interface Props {
	errors: Array<ICError | IFatalCError>
}

const FatalError: React.FC<Props> = (props) => {

	const { t: translatePages } = useTranslation('pages');

	const ErrorList: React.FC = () => {

		const errorList = props.errors.map((error: ICError | IFatalCError) => {
			return (
				<li key={Math.random()}>
					{error.date + ':'} {error.message} ({error.code})
				</li>
			);
		});

		return (
			<ul>
				{ errorList }
			</ul>
		)

	};

	const MailToLink: React.FC = () => {
		return (
			<a href={`mailto:${constants.WEBMASTER_EMAIL}`}
			   className={styles.EmailLink}
			   target={'_blank'}
			   rel={'noreferrer'}
			>
				{constants.WEBMASTER_EMAIL}
			</a>
		);
	};

	return (
		<Page style={styles.Fatal}>

			<div className={styles.Container}>

				<div className={styles.Title}>
					{ translatePages('fatalError.title') }
				</div>

				<div>

					{
						Object.keys(pagesTranslations.fatalError.description).map((key) => {

							return (
								<div key={key}>

									{ translatePages(`fatalError.description.${key}`) }

									{ key === '2' && <MailToLink /> }

								</div>
							)

						})

					}

				</div>

				<div>{ translatePages('fatalError.attachErrors') }</div>

				<div className={styles.ErrorList}>
					{
						<ErrorList />
					}
				</div>

			</div>

		</Page>
	);

}

export default FatalError;