import React from 'react';

import styles from './FormContainer.module.css';

interface IForm {
	id: 'login' | 'register'
}

interface Props {
	form: IForm
}

const FormContainer: React.FC<Props> = (props) => {
	return (
		<div className={styles.FormContainer}>
			<form id={props.form.id}>
				{props.children}
			</form>
		</div>
	);
};

export default FormContainer;