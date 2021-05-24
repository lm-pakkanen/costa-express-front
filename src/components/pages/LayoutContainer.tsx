import React from 'react';

import { addStylesToClass } from '../../helpers';

import styles from './LayoutContainer.module.css';

interface ILayoutContainer {
	style?: string
}

const LayoutContainer: React.FC<ILayoutContainer> = (props) => {

	let style = styles.LayoutContainer;

	if (props.style) {
		style = addStylesToClass(style, [props.style]);
	}

	return (
		<div className={style}>
			{props.children}
		</div>
	);
}

export default LayoutContainer;