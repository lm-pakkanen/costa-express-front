import React from 'react';

import styles from './ScheduleComponents.module.css';

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

export const RequestProposalButton: React.FC = () => {
	return (

		<button
			className={styles.RequestProposalButton}
		>
			Pyydä tarjous
		</button>

	);
}