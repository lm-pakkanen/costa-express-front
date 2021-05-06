import React from 'react';

import { addStylesToClass } from '../../helpers';

import styles from './SubPage.module.css';

interface Props {
	styles?: string[]
}

const SubPage: React.FC<Props> = (props) => {

	let style = styles.SubPage;

	if (props.styles) {
		style = addStylesToClass(style, props.styles);
	}

	return (
		<div className={style}>
			{props.children}
		</div>
	);
}

export default SubPage;