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
								Muut lemmikit
							</span>
							<span>
								Tarvittaessa vuokrahäkit
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
								Polkupyörät (myös sähkö)
							</span>
							<span>
								Scuutit (myös sähkö)
							</span>
							<span>
								Henkilö- ymt. autot (ajaen)
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
								Juomatoimitukset
							</span>
							<span>
								Muut kaupoista noudot
							</span>
						</div>
					</div>

				</div>

				<div className={styles.Row}>

					<div className={styles.RowText}>
						<div>
							<span>Costa del Solilla:</span>
							<span>
								Muutot
							</span>
							<span>
								Jakelut
							</span>
							<span>
								IKEA ym. noudot
							</span>
							<span>
								Muut kuljetukset
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