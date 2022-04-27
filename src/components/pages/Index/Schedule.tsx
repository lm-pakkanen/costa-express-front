import React from 'react';

import useSchedule from '../../../hooks/controllers/useSchedule';

import {
	DisabledRequestProposalButton, ErrorRequestProposalButton,
	RequestProposalButton,
	TableColumn,
	TableColumnTitle,
	TableRow,
	TableRowSeparator
} from './ScheduleComponents';

import { addStylesToClass } from '../../../helpers';

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

interface IScheduleTitle {
	value: string,
	styles?: string[]
}

interface IScheduleBody {}

const ScheduleTitle: React.FC<IScheduleTitle> = (props) => {

	let style = styles.ScheduleTitle;

	if (props.styles) {
		style = addStylesToClass(style, props.styles);
	}

	return (
		<h3 className={style}>
			{ props.value }
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

	let hasSpaceAvailable;

	if (props.rowData.hasSpaceAvailable === 'true') {
		hasSpaceAvailable = true;
	} else if (props.rowData.hasSpaceAvailable === 'false') {
		hasSpaceAvailable = false;
	} else {

		return <ErrorRequestProposalButton />

	}

	return hasSpaceAvailable
		?
		<RequestProposalButton startTime={startTime} />
		:
		<DisabledRequestProposalButton />;
};

const Schedule: React.FC<IScheduleBody> = () => {

	const data = useSchedule();

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

				<GetDataRows data={data} toCountry={'Espanja'} />

				<TableRow>
					<div className={styles.waiver}>
						Ajopäivät ovat ohjeellisia, ja saattavat muuttua tilanteen mukaan hieman.
					</div>
				</TableRow>

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

				<GetDataRows data={data} toCountry={'Suomi'} />

				<TableRow>
					<div className={styles.waiver}>
						Ajopäivät ovat ohjeellisia, ja saattavat muuttua tilanteen mukaan hieman.
					</div>
				</TableRow>

			</div>
		);

	};

	return (
		<div className={styles.Wrapper}>

			<div className={styles.Schedule}>
				<ScheduleTitle value={'Costalta Suomeen'} />
				<ToFinland />
			</div>

			<div className={styles.Schedule}>
				<ScheduleTitle value={'Suomesta Costalle'} />
				<ToSpain />
			</div>

		</div>
	);

};

export default Schedule;