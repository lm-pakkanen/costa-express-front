import React from 'react';

import constants from '../../../config/constants';

import { addStylesToClass } from '../../../helpers';

import styles from './Hero.module.css'
import IImage from '../../../interfaces/IImage';

interface IHeroLogo {}

interface IHeroCTAButton {
	value: string,
	title?: string,
	style?: string
	onClick?: (e?: React.FormEvent<HTMLInputElement>) => void
}

interface IHeroCTA {}

interface IHero  {}

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

	const RedirectToContactPage = () => {
		window.location.href = `${constants.BASE_URI}/ota-yhteytta`;
	};

	return (

		<div className={styles.HeroCTA}>

			<HeroCTAButton value={'Katso aikataulu'}
			               title={'Tutustu aikatauluumme'}
			               onClick={ScrollToSchedule}
			/>

			<HeroCTAButton value={'Ota yhteyttä'}
			               title={'Ota meihin yhteyttä sähköpostilla'}
			               onClick={RedirectToContactPage}
			/>

		</div>

	);

};

const Hero: React.FC<IHero> = (props) => {

	return (
		<>
			<HeroLogo />
			<HeroCTA />
		</>
	);

};

export default Hero;