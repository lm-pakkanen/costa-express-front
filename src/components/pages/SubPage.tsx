import React from 'react';

import { addStylesToClass } from '../../helpers';

import styles from './SubPage.module.css';

interface Props {
	style?: string
}

const SubPage: React.FC<Props> = (props) => {

	let style = styles.SubPage;

	if (props.style) {
		style = addStylesToClass(style, [props.style]);
	}

	return (
		<div className={style}>
			{props.children}
		</div>
	);
}

export default SubPage;