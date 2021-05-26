import React from 'react';

import useSchedule from '../../../hooks/controllers/useSchedule';

import { TableColumn, TableRow, TableRowSeparator } from './ScheduleComponents';

import styles from './Schedule.module.css';

interface IScheduleData {
	startCountries: null | string[],
	endCountries: null | string[],
	startTimes: null | string[],
	endTimes: null | string[]
}

interface IGetDataRows {
	data: null | IScheduleData
	column: IScheduleFields,
}

type IScheduleFields = 'startCountries' | 'endCountries' | 'startTimes' | 'endTimes';

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

const GetDataRows: React.FC<IGetDataRows> = (props) => {

	if (!(props.data && props.column)) { return <TableRow /> }

	const data = props.data[props.column];

	if (!data) { return <TableRow /> }

	const jsx = data.map((row: string) => <TableRow key={Math.random()}>{ row }</TableRow> );

	return (
		<>{jsx}</>
	);

};

const ScheduleBody: React.FC<IScheduleBody> = () => {

	const { data: scheduleData } = useSchedule();

	return (
		<div className={styles.ScheduleBody}>

			<TableColumn>

				<TableRow>
					Lähtöpaikka
				</TableRow>

				<TableRowSeparator />

				<GetDataRows data={scheduleData} column={'startCountries'} />

			</TableColumn>

			<TableColumn>

				<TableRow>
					Kohde
				</TableRow>

				<TableRowSeparator />

				<GetDataRows data={scheduleData} column={'endCountries'} />

			</TableColumn>

			<TableColumn>

				<TableRow>
					Lähtee
				</TableRow>

				<TableRowSeparator />

				<GetDataRows data={scheduleData} column={'startTimes'} />

			</TableColumn>

			<TableColumn>

				<TableRow>
					Perillä
				</TableRow>

				<TableRowSeparator />

				<GetDataRows data={scheduleData} column={'endTimes'} />

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