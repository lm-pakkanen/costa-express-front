import React from 'react';

import styles from './ProductsContainer.module.css';

interface Props {}

const ProductsContainer: React.FC<Props> = (props) => {
	return (
		<div className={styles.ProductsContainer}>
			{props.children}
		</div>
	);
}

export default ProductsContainer;