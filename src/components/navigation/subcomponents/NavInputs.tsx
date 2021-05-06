import React, { useContext, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { navigation } from '../../../config/actions';

import { appStore } from '../../../contexts/AppContext';

import useLanguageController from '../../../hooks/controllers/useLanguageController';

import { addStylesToClass } from '../../../helpers';

import IImage from '../../../interfaces/IImage';
import { SupportedLangs } from '../../../interfaces/types';

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

interface INavLanguageInput {
	img: IImage,
	handleClick: (e: React.MouseEvent<HTMLImageElement>) => void,
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

	const { t: translate } = useTranslation('navigation');

	const handleClick = (e: React.MouseEvent) => {
		dispatch({ type: navigation.toggleFloater });
	};

	const defaultStyle = addStylesToClass(styles.NavFloaterToggler, [styles.NavLink]);

	return (
		<div
			className={defaultStyle}
			title={translate('links.titles.floaterToggler')}
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

export const NavLanguageInput: React.FC<INavLanguageInput> = (props) => {

	const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
		e.preventDefault();
		props.handleClick(e);
	};

	const style = addStylesToClass(styles.NavLink, [styles.NavLanguageInput]);

	return (
		<img
			className={style}
			src={props.img.url}
			alt={props.img.alt}
			title={props.img.title}
			onClick={handleClick}
		/>
	);

};

export const LanguageSwitcher: React.FC = () => {

	const {
		getSupportedLanguages,
		handleLanguageSwitch
	} = useLanguageController();

	const { i18n } = useTranslation('common');

	const supportedLanguages = getSupportedLanguages();

	const currentLanguage = i18n.language as SupportedLangs;
	const currentLanguageImage = supportedLanguages[currentLanguage].img;

	/**
	 * Current language is stored in currentLanguage
	 * Delete current language from object to not render it twice
	 */
	delete supportedLanguages[currentLanguage];

	const handleFloaterShow = () => {
		setFloaterStyle(styles.NavLanguageFloater);
	};

	const handleFloaterHide = () => {
		setFloaterStyle(floaterDefaultStyle);
	};

	const floaterDefaultStyle = addStylesToClass(styles.NavLanguageFloater, [styles.hidden]);
	const [floaterStyle, setFloaterStyle] = useState(floaterDefaultStyle);

	return (

		<div
			className={styles.NavLanguageSwitcher}
			onMouseEnter={handleFloaterShow}
			onMouseLeave={handleFloaterHide}
		>

			<NavLanguageInput
				img={currentLanguageImage}
				handleClick={() => {
					/** Ignore click on current language in menu */
				}}
			/>

			<ul className={floaterStyle}>

				{
					/** Render each supported language as input */
					Object.keys(supportedLanguages).map((lang) => {

						const language = lang as SupportedLangs;

						return (
							<li key={language}>
								<NavLanguageInput
									img={supportedLanguages[language].img}
									handleClick={() => {
										handleLanguageSwitch(language);
									}}
								/>
							</li>
						);

					})
				}

			</ul>

		</div>

	);

};