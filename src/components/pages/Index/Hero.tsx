import React from 'react';

import constants from '../../../config/constants';

import useViewport from '../../../hooks/controllers/useViewport';

import { addStylesToClass } from '../../../helpers';

import IImage from '../../../interfaces/IImage';

import styles from './Hero.module.css'

interface IHeroLogo {}

interface IHeroCTAButton {
	value: string,
	title?: string,
	style?: string
	onClick?: (e?: React.FormEvent<HTMLInputElement>) => void
}

interface IHeroCTA {}

interface IHero  {}

const HeroBackground: React.FC = () => {

	const { viewport } = useViewport();
	const { height, width } = viewport;

	const backgroundMobile: IImage = {
		url:  `${constants.BASE_URI}/img/Landing_mobile-675x1125-80.jpg`,
		alt: '',
		title: 'CostaExpress'
	};

	const backgroundDesktop: IImage = {
		url:  `${constants.BASE_URI}/img/Landing_desktop-2000x1125-80.jpg`,
		alt: '',
		title: 'CostaExpress'
	};

	const backgroundDesktopLarge: IImage = {
		url:  `${constants.BASE_URI}/img/Landing_desktop-3000x1687-80.jpg`,
		alt: '',
		title: 'CostaExpress'
	};

	if (width <= 650 && height <= 1100) {

		return (
			<div className={styles.HeroBackgroundMobile}>
				<img src={backgroundMobile.url}
				     alt={backgroundMobile.alt}
				     title={backgroundMobile.title}
				/>
			</div>
		);

	} else if (width <= 1950 && height <= 1100) {

		return (
			<div className={styles.HeroBackgroundDesktop}>
				<img src={backgroundDesktop.url}
				     alt={backgroundDesktop.alt}
				     title={backgroundDesktop.title}
				/>
			</div>
		);

	} else {

		return (
			<div className={styles.HeroBackgroundDesktopLarge}>
				<img src={backgroundDesktopLarge.url}
				     alt={backgroundDesktopLarge.alt}
				     title={backgroundDesktopLarge.title}
				/>
			</div>
		);

	}

}

const HeroLogo: React.FC<IHeroLogo> = (props) => {

	const logo: IImage = {
		url:  `${constants.BASE_URI}/img/LogoV1.svg`,
		alt: 'CostaExpress',
		title: 'CostaExpress'
	};

	return (
		<div className={styles.HeroLogo}>
			<h1 className={styles.Logo}>
				<img src={logo.url} alt={logo.alt} title={logo.title} />
			</h1>

			<h2 className={styles.Slogan}>
				Muuttaa kaiken!
			</h2>
		</div>
	);

};


// eslint-disable-next-line
const HeroCTAButton: React.FC<IHeroCTAButton> = (props) => {

	let style = styles.HeroCTAButton;

	if (props.style) {
		style = addStylesToClass(style, [props.style]);
	}

	return (
		<input type={'button'}
		       className={style}
		       value={props.value}
		       onClick={props.onClick}
		       title={props.title}
		/>
	);
};


// eslint-disable-next-line
const HeroCTA: React.FC<IHeroCTA> = (props) => {

	const ScrollToContactInfo = () => {
		window.location.hash = 'ContactInfo';
	};

	return (

		<div className={styles.HeroCTA}>

			<HeroCTAButton value={'Katso aikataulu'}
			               title={'Tutustu aikatauluumme'}
			               onClick={() => {}}
			/>

			<HeroCTAButton value={'Ota yhteyttä'}
			               title={'Ota meihin yhteyttä'}
			               onClick={ScrollToContactInfo}
			/>

		</div>

	);

};

const Hero: React.FC<IHero> = (props) => {

	return (
		<>
			<HeroBackground />
			<HeroLogo />
		</>
	);

};

export default Hero;