import React from 'react';

import styles from './ContactContainer.module.css';

interface Props {}

const ContactContainer: React.FC<Props> = (props) => {

	return (
		<div className={styles.ContactContainer}>
			{props.children}
		</div>
	);
	
};

export default ContactContainer;