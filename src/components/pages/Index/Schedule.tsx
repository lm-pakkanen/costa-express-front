import React from 'react';

import useSchedule from '../../../hooks/controllers/useSchedule';

import { TableColumn, TableRow, TableRowSeparator } from './ScheduleComponents';

import styles from './Schedule.module.css';

interface IScheduleData {
	startCountryList: null | string[],
	endCountryList: null | string[],
	startTimeList: null | string[],
	endTimeList: null | string[],
	hasSpaceAvailableList: null | boolean[]
}

interface IGetDataRows {
	data: null | IScheduleData
	column: IScheduleFields,
}

interface IGetRequestButton {
	data: null | IScheduleData
}

type IScheduleFields = 'startCountryList' | 'endCountryList' | 'startTimeList' | 'endTimeList';

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

const GetRequestButton: React.FC<IGetRequestButton> = (props) => {

	if (!props.data) { return <TableRow /> }

	const data = props.data['hasSpaceAvailableList'];

	if (!data) { return <TableRow /> }

	const jsx = data.map((row: boolean) => <TableRow key={Math.random()}> {
		row ? <button value={'Pyydä tarjous'} /> : 'Kuljetus täynnä'
	} </TableRow> );

	return <>{jsx}</>;

};

const ScheduleBody: React.FC<IScheduleBody> = () => {

	const { error, data: scheduleData } = useSchedule();

	if (error) console.error(error);

	return (
		<div className={styles.ScheduleBody}>

			<TableColumn>

				<TableRow>
					Lähtöpaikka
				</TableRow>

				<TableRowSeparator />

				<GetDataRows data={scheduleData} column={'startCountryList'} />

			</TableColumn>

			<TableColumn>

				<TableRow>
					Kohde
				</TableRow>

				<TableRowSeparator />

				<GetDataRows data={scheduleData} column={'endCountryList'} />

			</TableColumn>

			<TableColumn>

				<TableRow>
					Lähtee
				</TableRow>

				<TableRowSeparator />

				<GetDataRows data={scheduleData} column={'startTimeList'} />

			</TableColumn>

			<TableColumn>

				<TableRow>
					Perillä
				</TableRow>

				<TableRowSeparator />

				<GetDataRows data={scheduleData} column={'endTimeList'} />

			</TableColumn>

			<TableColumn>

				<TableRow>
					Pyydä tarjous
				</TableRow>

				<TableRowSeparator />

				<GetRequestButton data={scheduleData} />

			</TableColumn>

		</div>
	);

};

const Schedule: React.FC<ISchedule> = () => {

	return (
		<div className={styles.Wrapper}>
			<ScheduleTitle />
			<ScheduleBody />
		</div>
	);

};

export default Schedule;