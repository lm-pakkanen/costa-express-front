import React from 'react';

import constants from '../../config/constants';

import styles from './Footer.module.css';
import { addStylesToClass } from '../../helpers';
import { useTranslation } from 'react-i18next';
import IImage from '../../interfaces/IImage';

interface IFooter {}

const Footer: React.FC<IFooter> = () => {

	const { t: translate } = useTranslation('navigation');
	const { t: translateCommon } = useTranslation('common');

	const footerGraphic: IImage = {
		url: `${constants.BASE_URI}/img/footer_graphic.svg`,
		alt: translateCommon('elementAlts.footer'),
		title: translateCommon('elementTitles.footer')
	};

	return (
		<div className={styles.FooterWrapper}>

			<img src={footerGraphic.url} alt={footerGraphic.alt} title={footerGraphic.title} />

			<div className={styles.Footer}>

				<div className={addStylesToClass(styles.ContentWrapper, [styles.Links])}>

					<a
						href={constants.BASE_URI}
						title={'© Harriot.fi'}
					>
						© Harriot.fi
					</a>

					<a
						href={new URL(translate('links.urls.privacyPolicy'), constants.BASE_URI).toString()}
						title={translate('links.titles.privacyPolicy')}
					>
						{ translate('links.texts.privacyPolicy') }
					</a>

				</div>

			</div>

		</div>
	);
};

export default Footer;