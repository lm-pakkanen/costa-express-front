import React from 'react';

import styles from './InfoBoxes.module.css';

interface IProps {}

const InfoBoxes: React.FC<IProps> = (props) => {

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

					</div>

				</div>

				<div className={styles.Row}>

					<div className={styles.RowImage}>

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