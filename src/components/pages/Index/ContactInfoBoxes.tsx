import React from 'react';

import styles from './ContactInfoBoxes.module.css';
import IImage from '../../../interfaces/IImage';
import constants from '../../../config/constants';
import { addStylesToClass } from '../../../helpers';

interface IContactInfoBoxes {

}

const emailIcon: IImage = {
	url:  `${constants.BASE_URI}/img/FontAwesome/envelope.svg`,
	alt: 'Sähköposti',
	title: 'Sähköposti'
};

const whatsappIcon: IImage = {
	url:  `${constants.BASE_URI}/img/FontAwesome/whatsapp.svg`,
	alt: 'Whatsapp',
	title: 'Whatsapp'
};

const phoneIcon: IImage = {
	url:  `${constants.BASE_URI}/img/FontAwesome/phone-square-alt.svg`,
	alt: 'Puhelin',
	title: 'Puhelin'
};

const ContactInfoBoxes: React.FC<IContactInfoBoxes> = (props) => {

	const emailButtonStyle = addStylesToClass(styles.Item, [styles.ItemButton]);

	return (
		<div className={styles.Wrapper}>

			<div className={styles.Container}>

				<a className={emailButtonStyle}
				   href={'mailto:info@costaexpress.fi'}
				   title={'Lähetä sähköposti'}
				>
					<i className={styles.ItemIcon}>
						<img src={emailIcon.url} alt={emailIcon.alt} title={emailIcon.title} />
					</i>
					<div>info@costaexpress.fi</div>
				</a>

				<div className={styles.Item}>
					<i className={styles.ItemIcon}>
						<img src={whatsappIcon.url} alt={whatsappIcon.alt} title={whatsappIcon.title} />
					</i>
					<i className={styles.ItemIcon}>
						<img src={phoneIcon.url} alt={phoneIcon.alt} title={phoneIcon.title} />
					</i>
					<div>+34 646503676</div>
				</div>

				<div className={styles.Item}>
					<i className={styles.ItemIcon}>
						<img src={phoneIcon.url} alt={phoneIcon.alt} title={phoneIcon.title} />
					</i>
					<div>+358 40 7151474</div>
				</div>

			</div>

		</div>
	);

}

export default ContactInfoBoxes;