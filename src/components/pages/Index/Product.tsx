import React from 'react';

import IImage from '../../../interfaces/IImage';

import styles from './Product.module.css';
import { useTranslation } from 'react-i18next';

interface IProduct {}

interface IProductHero {
	img: IImage
}

interface IProductTitle {
	title: string,
	price: string,
	symbol: string,
	isPriceFixed?: boolean
}

interface IProductDescription {}

interface IProductPurchaseButton {
	productID: number
}

export const Product: React.FC<IProduct> = (props) => {
	return (
		<div className={styles.Product}>
			{props.children}
		</div>
	);
};

export const ProductHero: React.FC<IProductHero> = (props) => {

	return (
		<div className={styles.ProductHero} >

			<img
				src={props.img.url.toString()}
				alt={props.img.alt}
				title={props.img.title}
			/>

		</div>
	);
};

export const ProductTitle: React.FC<IProductTitle> = (props) => {

	const { t: translate } = useTranslation('common');

	const fixedPrice = () => {

		const price = translate('products.staticPrice', { symbol: props.symbol, price: props.price });

		return (
			<>{ `${price}` }</>
		);
	};

	const variablePrice = () => {

		const price = translate('products.variablePrice', { symbol: props.symbol, price: props.price });

		return (
			<>{ `${price}` }</>
		);
	}

	return (
		<div className={styles.ProductTitle}>

			<div className={styles.ProductTitleHeading}>
				<div>
					{props.title}
				</div>
			</div>

			<div className={styles.ProductTitlePrice}>
				{ props.isPriceFixed ? fixedPrice() : variablePrice() }
			</div>

		</div>
	);
};

ProductTitle.defaultProps = { isPriceFixed: false };

export const ProductDescription: React.FC<IProductDescription> = (props) => {
	return (
		<div className={styles.ProductDescription}>
			{props.children}
		</div>
	);
};

export const ProductPurchaseButton: React.FC<IProductPurchaseButton> = (props) => {

	const { t: translate } = useTranslation('common');

	const onClick = () => {

		const { productID } = props;
		return productID;

	};

	return (
		<input type={'button'}
		       className={styles.ProductPurchaseButton}
		       title={translate('products.priceButton')}
		       value={translate('products.priceButton').toString()}
		       onClick={onClick}
		/>
	);
};