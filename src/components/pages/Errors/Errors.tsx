import React from 'react';

import styles from './Errors.module.css';

interface INotFoundContainer {}

const NotFoundContainer: React.FC<INotFoundContainer> = (props) => {

	return (

		<div className={styles.NotFoundContainer}>
			{props.children}
		</div>

	);

}

export default NotFoundContainer;