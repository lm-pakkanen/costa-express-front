import React from 'react';

import Page from '../../components/pages/Page';

import ICError from '../../interfaces/ICError';
import IFatalCError from '../../interfaces/IFatalCError';

import styles from './FatalError.module.css';

interface Props {
	errors: Array<ICError | IFatalCError>
}

const FatalError: React.FC<Props> = (props) => {

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
			<a href={`mailto:${process.env.REACT_APP_WEBMASTER_EMAIL}`}
			   className={styles.EmailLink}
			   target={'_blank'}
			   rel={'noreferrer'}
			>
				{ process.env.REACT_APP_WEBMASTER_EMAIL }
			</a>
		);
	};

	return (
		<Page style={styles.Fatal}>

			<div className={styles.Container}>

				<div className={styles.Title}>
					Tämäpä kiusallista.
				</div>

				<div>

					<div>Sivusto kohtasi vakavan virhetilan.</div>
					<div>Virhe on tallennettu.</div>
					<div>
						Jos virhetila esiintyy uudelleen, ota yhteyttä sivuston hallintaan sähköpostilla:
						<MailToLink />
					</div>

				</div>

				<div>Lisääthän nämä virheviestit sähköpostiisi, kiitos!</div>

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