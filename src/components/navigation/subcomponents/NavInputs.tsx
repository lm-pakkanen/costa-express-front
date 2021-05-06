import React, { useContext } from 'react';

import { navigation } from '../../../config/actions';

import { appStore } from '../../../contexts/AppContext';

import { addStylesToClass } from '../../../helpers';

import IImage from '../../../interfaces/IImage';

import styles from './NavInputs.module.css';

interface INavButton {
	id: string,
	type?: 'button' | 'submit',
	text: string | number,
	title?: string,
	isActive?: boolean,
	onClick?: (e?: React.MouseEvent<HTMLInputElement>) => void,
	buttonRef?: React.MutableRefObject<any>,
	styles?: string[]
}

interface INavLink {
	id: string,
	href: URL,
	text: string | number,
	isActive?: boolean,
	target?: '_blank' | '_self',
	title?: string,
	image?: IImage,
	styles?: string[]
}


export const NavButton:React.FC<INavButton> = (props) => {

	let style = styles.NavLink;

	if (props.isActive) { style = addStylesToClass(style, [styles.active]); }

	if (props.styles) { style = addStylesToClass(style, props.styles); }

	return (
		<input
			type={props.type}
			id={props.id}
			className={style}
			title={props.title && props.title}
			onClick={props.onClick}
			value={props.text}
			ref={props.buttonRef}
		/>
	);
}

NavButton.defaultProps = {
	type: 'button'
};

export const NavLink:React.FC<INavLink> = (props) => {

	let style = styles.NavLink;

	if (props.styles) { style = addStylesToClass(style, props.styles); }

	if (props.isActive) { style = addStylesToClass(style, [styles.active]); }

	return (
		<a
			className={style}
			id={props.id}
			href={props.href.toString()}
			title={props.title && props.title}
			target={props.target && props.target}
		>
			{props.image
				?
				(
					<img
						src={props.image.url.toString()}
						alt={props.image.alt}
						title={props.image.title && props.image.title}
					/>
				)
				: props.text
			}
		</a>
	);
}

NavLink.defaultProps = {
	target: '_self'
};

export const NavFloaterToggler: React.FC = () => {

	const appContext = useContext(appStore);
	const { state, dispatch } = appContext;
	const ref = state.navigation.refs.togglerRef;

	const handleClick = (e: React.MouseEvent) => {
		dispatch({ type: navigation.toggleFloater });
	};

	const defaultStyle = addStylesToClass(styles.NavFloaterToggler, [styles.NavLink]);

	return (
		<div
			className={defaultStyle}
			title={'Valikko'}
			ref={ref}
			onClick={handleClick}
		>
			<div>
				<span className={styles.NavFloaterTogglerTop} />
				<span className={styles.NavFloaterTogglerMiddle} />
				<span className={styles.NavFloaterTogglerBottom} />
			</div>
		</div>
	);
};