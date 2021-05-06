import React from 'react';

interface Props {}

const FormError: React.FC<Props> = (props) => {
	return (
		<div className={'error'}>
			{props.children}
		</div>
	);
}

export default FormError;