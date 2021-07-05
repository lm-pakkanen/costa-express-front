import React from 'react';

import useSchedule from '../../../hooks/controllers/useSchedule';

import {
	RequestProposalButton,
	TableColumn,
	TableColumnTitle,
	TableRow,
	TableRowSeparator
} from './ScheduleComponents';

import styles from './Schedule.module.css';

interface IScheduleData {
	startCountry: string,
	endCountry: string,
	startTime: string,
	hasSpaceAvailable: string
}

interface IGetDataRows {
	data: IScheduleData[],
	toCountry: 'Espanja' | 'Suomi'
}

interface IGetRequestButton {
	rowData: IScheduleData
}

interface IScheduleTitle {}

interface IScheduleBody {}

const ScheduleTitle: React.FC = () => {
	return (
		<h2 className={styles.ScheduleTitle}>
			Kuljetusaikataulu (kansainväliset reitit)
		</h2>
	)

};

const ToFinlandScheduleTitle: React.FC<IScheduleTitle> = () => {

	return (
		<h3 className={styles.ScheduleBodyTitle}>
			Costalta Suomeen
		</h3>
	);

};

const ToSpainScheduleTitle: React.FC<IScheduleTitle> = () => {

	return (
		<h3 className={styles.ScheduleBodyTitle}>
			Suomesta Costalle
		</h3>
	);

};

const GetDataRows: React.FC<IGetDataRows> = (props) => {

	if (!(props.data && props.toCountry)) { return <></> }

	const jsx = props.data.map((row) => (

		row.endCountry === props.toCountry
			?
			<TableRow key={Math.random()}>

				<TableColumn>
					{ row.startTime }
				</TableColumn>

				<TableColumn>
					<GetRequestButton rowData={row} />
				</TableColumn>

			</TableRow>
			:
			<span key={Math.random()} />
	));

	return (
		<>{jsx}</>
	);

};

const GetRequestButton: React.FC<IGetRequestButton> = (props) => {

	if (!props.rowData) { return <></> }

	const startTime = props.rowData.startTime;

	return props.rowData.hasSpaceAvailable
		?
		<RequestProposalButton startTime={startTime} />
		:
		<span>
			Kuljetus täynnä
		</span>;
};

const Schedule: React.FC<IScheduleBody> = () => {

	const scheduleData = useSchedule();

	const ToSpain: React.FC = () => {

		return (
			<div className={styles.ScheduleBody}>

				<TableRow>
					<TableColumnTitle>
						<span>Lähtee</span>
					</TableColumnTitle>
					<TableColumnTitle>
						<span>Pyydä tarjous</span>
					</TableColumnTitle>
				</TableRow>

				<TableRowSeparator />

				<GetDataRows data={scheduleData} toCountry={'Espanja'} />

			</div>
		);

	};

	const ToFinland: React.FC = () => {

		return (
			<div className={styles.ScheduleBody}>

				<TableRow>
					<TableColumnTitle>
						<span>Lähtee</span>
					</TableColumnTitle>
					<TableColumnTitle>
						<span>Pyydä tarjous</span>
					</TableColumnTitle>
				</TableRow>

				<TableRowSeparator />

				<GetDataRows data={scheduleData} toCountry={'Suomi'} />

			</div>
		);

	};

	return (
		<div className={styles.Wrapper}>

			<ScheduleTitle />

			<ToFinlandScheduleTitle />
			<div className={styles.ScheduleBodyWrapper}>
				<ToFinland />
			</div>

			<ToSpainScheduleTitle />
			<div className={styles.ScheduleBodyWrapper}>
				<ToSpain />
			</div>

		</div>
	);

};

export default Schedule;