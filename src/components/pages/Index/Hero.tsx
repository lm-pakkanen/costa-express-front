import React from 'react';

import constants from '../../../config/constants';

import { addStylesToClass } from '../../../helpers';

import styles from './Hero.module.css'
import IImage from '../../../interfaces/IImage';
import useViewport from '../../../hooks/controllers/useViewport';

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
	const { width } = viewport;

	const backgroundMobile: IImage = {
		url:  `${constants.BASE_URI}/img/Landing_mobile-10.jpg`,
		alt: '',
		title: 'CostaExpress'
	};

	const backgroundDesktop: IImage = {
		url:  `${constants.BASE_URI}/img/Landing_desktop-10.jpg`,
		alt: '',
		title: 'CostaExpress'
	};

	if (width <= 600) {

		return (
			<div className={styles.HeroBackgroundMobile}>
				<img src={backgroundMobile.url}
				     alt={backgroundMobile.alt}
				     title={backgroundMobile.title}
				/>
			</div>
		);

	} else {

		return (
			<div className={styles.HeroBackgroundDesktop}>
				<img src={backgroundDesktop.url}
				     alt={backgroundDesktop.alt}
				     title={backgroundDesktop.title}
				/>
			</div>
		);

	}

}

const HeroLogo: React.FC<IHeroLogo> = (props) => {

	const logo: IImage = {
		url:  `${constants.BASE_URI}/img/logo.svg`,
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

const HeroCTA: React.FC<IHeroCTA> = (props) => {

	const ScrollToSchedule = () => {
		window.location.hash = 'Schedule';
	};

	const ScrollToContactInfo = () => {
		window.location.hash = 'ContactInfo';
	};

	return (

		<div className={styles.HeroCTA}>

			<HeroCTAButton value={'Katso aikataulu'}
			               title={'Tutustu aikatauluumme'}
			               onClick={ScrollToSchedule}
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
			<HeroCTA />
		</>
	);

};

export default Hero;