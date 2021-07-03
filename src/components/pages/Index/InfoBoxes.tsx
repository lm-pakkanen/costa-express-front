import React from 'react';

import styles from './InfoBoxes.module.css';
import IImage from '../../../interfaces/IImage';
import constants from '../../../config/constants';

interface IProps {}

const InfoBoxes: React.FC<IProps> = (props) => {


	const infobox1: IImage = {
		url:  `${constants.BASE_URI}/img/img1-landing.svg`,
		alt: 'Moottoripyörä',
		title: 'Moottoripyörä'
	};

	const infobox2: IImage = {
		url:  `${constants.BASE_URI}/img/img2-landing.svg`,
		alt: 'Muuttolaatikot',
		title: 'Muuttolaatikot'
	};

	return (

		<>

			<h2 className={styles.Title}>
				Kuljetamme mitä vaan!
			</h2>

			<div className={styles.Container}>


				<div className={styles.Row}>

					<div className={styles.RowImage}>

					</div>

					<div className={styles.RowText}>
						<div>
							<span>
								Koirat
							</span>
							<span>
								Kissat
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

						</div>

					</div>

					<div className={styles.RowImage}>
						<img src={infobox1.url} alt={infobox1.alt} title={infobox1.title} />
					</div>

				</div>

				<div className={styles.Row}>

					<div className={styles.RowImage}>
						<img src={infobox2.url} alt={infobox2.alt} title={infobox2.title} />
					</div>

					<div className={styles.RowText}>

						<div>

							<span>
								Muuttotavarat
							</span>
							<span>
								Juotavat
							</span>

						</div>

					</div>

				</div>

			</div>

		</>

	);

}

export default InfoBoxes;