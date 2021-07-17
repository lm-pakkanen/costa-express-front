import React from 'react';

import useSchedule from '../../../hooks/controllers/useSchedule';

import {
	DisabledRequestProposalButton,
	RequestProposalButton,
	TableColumn,
	TableColumnTitle,
	TableRow,
	TableRowSeparator
} from './ScheduleComponents';

import styles from './Schedule.module.css';
import { addStylesToClass } from '../../../helpers';

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

interface IToFinlandScheduleTitle extends IScheduleTitle {
	styles?: string[]
}

const ToFinlandScheduleTitle: React.FC<IToFinlandScheduleTitle> = (props) => {

	let style = styles.ScheduleBodyTitle;

	if (props.styles) {
		style = addStylesToClass(style, props.styles);
	}

	return (
		<h3 className={style}>
			Costalta Suomeen
		</h3>
	);

};

interface IToSpainScheduleTitle extends IScheduleTitle {
	styles?: string[]
}

const ToSpainScheduleTitle: React.FC<IToSpainScheduleTitle> = (props) => {

	let style = styles.ScheduleBodyTitle;

	if (props.styles) {
		style = addStylesToClass(style, props.styles);
	}

	return (
		<h3 className={style}>
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
			<DisabledRequestProposalButton />
		</span>;
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

			</div>
		);

	};

	return (
		<div className={styles.Wrapper}>

			<div className={styles.ScheduleBodyWrapperWrapper}>

				<div className={styles.ToFinland}>
					<ToFinlandScheduleTitle />
					<div className={styles.ScheduleBodyWrapper}>
						<ToFinland />
					</div>
				</div>

				<div>
					<ToSpainScheduleTitle styles={[styles.black]}/>
					<div className={styles.ScheduleBodyWrapper}>
						<ToSpain />
					</div>
				</div>

			</div>

		</div>
	);

};

export default Schedule;