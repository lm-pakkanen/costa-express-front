import React from 'react';

import styles from './InfoBoxes.module.css';
import IImage from '../../../interfaces/IImage';
import constants from '../../../config/constants';

interface IProps {}

const InfoBoxes: React.FC<IProps> = (props) => {


	const infobox1: IImage = {
		url:  `${constants.BASE_URI}/img/img1-landing-20.jpg`,
		alt: 'Moottoripyörä',
		title: 'Moottoripyörä'
	};

	const infobox2: IImage = {
		url:  `${constants.BASE_URI}/img/img2-landing-20.jpg`,
		alt: 'Muuttolaatikot',
		title: 'Muuttolaatikot'
	};

	const infobox3: IImage = {
		url:  `${constants.BASE_URI}/img/img3-landing-20.jpg`,
		alt: 'Eläimet',
		title: 'Eläimet'
	};

	const infobox4: IImage = {
		url:  `${constants.BASE_URI}/img/paku-592x592-80.jpg`,
		alt: 'Pakettiauto',
		title: 'Pakettiauto'
	};

	return (

		<div className={styles.Wrapper}>

			<h2 className={styles.Title}>
				Kuljetamme mitä vaan
			</h2>

			<div className={styles.Container}>


				<div className={styles.Row}>

					<img className={styles.RowImage} src={infobox3.url} alt={infobox3.alt} title={infobox3.title} />

					<div className={styles.RowText}>
						<div>
							<span>
								Koirat
							</span>
							<span>
								Kissat
							</span>
							<span>
								Vuokrahäkit
							</span>
						</div>
					</div>
				</div>

				<div className={styles.Row}>

					<div className={styles.RowText}>
						<div>
							<span>
								Moottoripyörät
							</span>
							<span>
								Polkupyörät
							</span>
							<span>
								Sähköskootterit
							</span>
							<span>
								Henkilöautot
							</span>
						</div>
					</div>

					<img className={styles.RowImage} src={infobox1.url} alt={infobox1.alt} title={infobox1.title} />

				</div>

				<div className={styles.Row}>

					<img className={styles.RowImage} src={infobox2.url} alt={infobox2.alt} title={infobox2.title} />

					<div className={styles.RowText}>
						<div>
							<span>
								Laukut, laatikot
							</span>
							<span>
								Muuttokuormat
							</span>
							<span>
								Noudot kaupoista
							</span>
						</div>
					</div>

				</div>

				<div className={styles.Row}>

					<div className={styles.RowText}>
						<div>
							<span>
								Laukut, laatikot
							</span>
							<span>
								Muuttokuormat
							</span>
							<span>
								Noudot kaupoista
							</span>
						</div>
					</div>

					<img className={styles.RowImage} src={infobox4.url} alt={infobox4.alt} title={infobox4.title} />

				</div>

			</div>

		</div>

	);

}

export default InfoBoxes;