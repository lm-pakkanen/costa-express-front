import React from 'react';

import styles from './Schedule.module.css';

interface IScheduleTitle {}

interface IScheduleBody {}

interface ISchedule {}

const ScheduleTitle: React.FC<IScheduleTitle> = () => {

	return (
		<h3 className={styles.ScheduleTitle}>
			Tulevat kuljetukset
		</h3>
	);

};

const ScheduleBodyColumn: React.FC = (props) => {
	return (
		<div className={styles.ScheduleBodyColumn}>
			{ props.children }
		</div>
	);
};

const ScheduleBodyRow: React.FC = (props) => {
	return (
		<div className={styles.ScheduleBodyRow}>
			{ props.children }
		</div>
	);
};

const ScheduleBodyRowSeparator: React.FC = () => {
	return (
		<div className={styles.ScheduleBodyRowSeparator} />
	);
}

const ScheduleBody: React.FC<IScheduleBody> = () => {

	return (
		<div className={styles.ScheduleBody}>

			<ScheduleBodyColumn>

				<ScheduleBodyRow>
					Lähtöpaikka
				</ScheduleBodyRow>

				<ScheduleBodyRowSeparator />

				<ScheduleBodyRow>
					Suomi
				</ScheduleBodyRow>

			</ScheduleBodyColumn>

			<ScheduleBodyColumn>

				<ScheduleBodyRow>
					Kohde
				</ScheduleBodyRow>

				<ScheduleBodyRowSeparator />

				<ScheduleBodyRow>
					Espanja
				</ScheduleBodyRow>

			</ScheduleBodyColumn>

			<ScheduleBodyColumn>

				<ScheduleBodyRow>
					Lähtee
				</ScheduleBodyRow>

				<ScheduleBodyRowSeparator />

				<ScheduleBodyRow>
					29.5.2021
				</ScheduleBodyRow>

			</ScheduleBodyColumn>

			<ScheduleBodyColumn>

				<ScheduleBodyRow>
					Perillä
				</ScheduleBodyRow>

				<ScheduleBodyRowSeparator />

				<ScheduleBodyRow>
					6.6.2021
				</ScheduleBodyRow>

			</ScheduleBodyColumn>

		</div>
	);

};

const Schedule: React.FC<ISchedule> = () => {

	return (
		<div className={styles.Wrapper} id={'Schedule'}>
			<ScheduleTitle />
			<ScheduleBody />
		</div>
	);

};

export default Schedule;