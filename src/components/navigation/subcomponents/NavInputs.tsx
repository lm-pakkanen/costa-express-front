import React, { useContext } from 'react';

import { navigation } from '../../../config/actions';

import { appStore } from '../../../contexts/AppContext';

import { addStylesToClass } from '../../../helpers';

import IImage from '../../../interfaces/IImage';

import styles from './NavInputs.module.css';

interface INavInput {
	id: string,
	text: string | number,
	title?: string,
	isActive?: boolean,
	style?: string
}

interface INavButton extends INavInput {
	type?: 'button' | 'submit',
	buttonRef?: React.MutableRefObject<any>,
	onClick?: (e?: React.MouseEvent<HTMLInputElement>) => void,
}

interface INavLink extends INavInput {
	href: URL,
	target?: '_blank' | '_self',
	image?: IImage,
}


export const NavButton:React.FC<INavButton> = (props) => {

	let style = styles.NavLink;

	if (props.isActive) { style = addStylesToClass(style, [styles.active]); }

	if (props.style) { style = addStylesToClass(style, [props.style]); }

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

	if (props.style) { style = addStylesToClass(style, [props.style]); }

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

	const handleClick = () => {
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