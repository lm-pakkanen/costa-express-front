import React from 'react';

import constants from '../../../config/constants';

import { addStylesToClass } from '../../../helpers';

import styles from './ScheduleComponents.module.css';

interface IRequestProposalButton {
	startTime: string
}

export const TableColumnTitle: React.FC = (props) => {

	const style = addStylesToClass(styles.TableColumn, [styles.Title]);

	return (
		<div className={style}>
			{ props.children }
		</div>
	)
}

export const TableColumn: React.FC = (props) => {
	return (
		<div className={styles.TableColumn}>
			{ props.children }
		</div>
	);
};

export const TableRow: React.FC = (props) => {
	return (
		<div className={styles.TableRow}>
			{ props.children }
		</div>
	);
};

export const TableRowSeparator: React.FC = () => {
	return (
		<div className={styles.TableRowSeparator} />
	);
}

export const RequestProposalButton: React.FC<IRequestProposalButton> = (props) => {

	if (!props.startTime) { return <></>; }

	const onClick = () => {
		window.location.href = `${constants.BASE_URI}/tarjouspyynto?date=${props.startTime}`;
	};

	return (
		<button
			className={styles.RequestProposalButton}
			onClick={onClick}
		>
			Pyydä tarjous
		</button>

	);
}

export const DisabledRequestProposalButton: React.FC = () => {

	return (
		<button
			className={addStylesToClass(styles.RequestProposalButton, [styles.disabled])}
		>
			Kuljetus täysi
		</button>

	);
}