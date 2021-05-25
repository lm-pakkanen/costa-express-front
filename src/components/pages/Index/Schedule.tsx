import React from 'react';

import { TableColumn, TableRow, TableRowSeparator } from './ScheduleComponents';

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



const ScheduleBody: React.FC<IScheduleBody> = () => {

	return (
		<div className={styles.ScheduleBody}>

			<TableColumn>

				<TableRow>
					Lähtöpaikka
				</TableRow>

				<TableRowSeparator />

				<TableRow>
					Suomi
				</TableRow>

			</TableColumn>

			<TableColumn>

				<TableRow>
					Kohde
				</TableRow>

				<TableRowSeparator />

				<TableRow>
					Espanja
				</TableRow>

			</TableColumn>

			<TableColumn>

				<TableRow>
					Lähtee
				</TableRow>

				<TableRowSeparator />

				<TableRow>
					29.5.2021
				</TableRow>

			</TableColumn>

			<TableColumn>

				<TableRow>
					Perillä
				</TableRow>

				<TableRowSeparator />

				<TableRow>
					6.6.2021
				</TableRow>

			</TableColumn>

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