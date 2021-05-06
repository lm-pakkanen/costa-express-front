import React from 'react';

import constants from '../../config/constants';

import styles from './Footer.module.css';
import { addStylesToClass } from '../../helpers';

interface IFooter {}

const Footer: React.FC<IFooter> = () => {

	return (
		<div className={styles.FooterWrapper}>

			<div className={styles.Footer}>

				<div className={addStylesToClass(styles.ContentWrapper, [styles.Links])}>

					<span>© Harriot Software</span>

					<a
						href={new URL('tietosuoja', constants.BASE_URI).toString()}
						title={'Tietosuoja'}
					>
						Tietosuoja
					</a>

				</div>

			</div>

		</div>
	);
};

export default Footer;