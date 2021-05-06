import React from 'react';

import styles from './IndexContainer.module.css';

interface Props {}

const IndexContainer: React.FC<Props> = (props) => {
	return (
		<div className={styles.IndexContainer}>
			{props.children}
		</div>
	);
}

export default IndexContainer;