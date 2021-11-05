import React from 'react';

import constants from '../../config/constants';

import styles from './Footer.module.css';

interface IFooter {}

const Footer: React.FC<IFooter> = () => {

	return (
		<div className={styles.FooterWrapper}>

			<div className={styles.Footer}>

				<div className={styles.ContentWrapper}>

					<span className={styles.Copyright}>© Harriot Software</span>

					<a
						href={new URL('COSTA_Express_ohjeet.pdf', constants.BASE_URI).toString()}
						title={'COSTA Express ohjeet'}
						target={'_blank'}
						rel={'noreferrer'}
					>
						COSTA Express OHJEET
					</a>

					<a
						href={new URL('COSTA_Express_lemmikit.pdf', constants.BASE_URI).toString()}
						title={'COSTA Express lemmikit'}
						target={'_blank'}
						rel={'noreferrer'}
					>
						COSTA Express LEMMIKIT
					</a>

				</div>

			</div>

		</div>
	);
};

export default Footer;