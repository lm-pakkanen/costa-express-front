import React, { useEffect, useState } from 'react';
import papa from 'papaparse';

import { TableColumn, TableRow, TableRowSeparator } from './ScheduleComponents';

import styles from './Schedule.module.css';

interface IScheduleDataRow {
	startCountry: string,
	endCountry: string,
	startTime: string,
	endTime: string
}

interface IScheduleData {
	startCountries: string[],
	endCountries: string[],
	startTimes: string[],
	endTimes: string[]
}

interface IGetDataRows {
	data: null | IScheduleData
	column: IScheduleFields,
}

type IScheduleFields = 'startCountries' | 'endCountries' | 'startTimes' | 'endTimes';

interface IScheduleTitle {}

interface IScheduleBody {}

interface ISchedule {}

const getScheduleData = async () => {

	const getCSVData = async () => {

		try {

			const fileContents = await fetch('/assets/Schedule.csv');

			if (!fileContents.body) {
				return false;
			}

			const reader = fileContents.body.getReader();
			const readResult = await reader.read();

			const decoder = new TextDecoder('utf-8');

			return decoder.decode(readResult.value);

		} catch (err) {
			console.error(err);
			return false;
		}

	};

	const csvData = await getCSVData();

	if (!csvData) {
		return false;
	}

	const parsedData = papa.parse(csvData, { header: true });

	if (parsedData.errors.length !== 0) {
		console.error(parsedData.errors);
		return false;
	}

	if (!parsedData.data) {
		return false;
	}

	return parsedData.data;

};

const ScheduleTitle: React.FC<IScheduleTitle> = () => {

	return (
		<h3 className={styles.ScheduleTitle}>
			Tulevat kuljetukset
		</h3>
	);

};

const GetDataRows: React.FC<IGetDataRows> = (props) => {

	if (!(props.data && props.column)) { return <TableRow /> }

	const jsx = props.data[props.column].map(
		(row: string) => <TableRow key={Math.random()}>{row}</TableRow>
	);

	return (
		<>{jsx}</>
	);

};

const ScheduleBody: React.FC<IScheduleBody> = () => {

	const [scheduleData, setScheduleData] = useState<null | IScheduleData>(null)

	useEffect(() => {

		getScheduleData().then((data) => {

			if (!data) {
				console.error('No data was found for schedule');
				return false;
			}


			const startCountries = [];
			const endCountries = [];
			const startTimes = [];
			const endTimes = [];

			for (let _row of data) {

				const row = _row as IScheduleDataRow;

				startCountries.push(row.startCountry);
				endCountries.push(row.endCountry);
				startTimes.push(row.startTime);
				endTimes.push(row.endTime);

			}

			const resultData = {
				startCountries,
				endCountries,
				startTimes,
				endTimes
			};

			setScheduleData(resultData);

		});

	}, []);

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