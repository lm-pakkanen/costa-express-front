import React from 'react';

import styles from './ContactFormInputs.module.css';
import { addStylesToClass } from '../../../helpers';

interface IInput {
	value: string,
	style?: string,
	hasError?: boolean
}


interface ITextInput extends IInput {
	onChange: (e: any) => void
	placeholder?: string
	label?: string
}

interface ITextAreaInput extends IInput {
	onChange: (e: any) => void,
	placeholder?: string
	label?: string
}

interface ISubmitButton extends IInput {
	onClick: (e: any) => void
}

export const TextInput: React.FC<ITextInput> = (props) => {

	let style = styles.TextInput;

	if (props.hasError) {
		style = addStylesToClass(style, [styles.TextInputWithError])
	}

	if (props.style) {
		style = addStylesToClass(style, [props.style]);
	}

	return (
		<>

			{ props.label && (
				<label>{props.label}</label>
			)}

			<input type={'text'}
			       className={style}
			       value={props.value}
			       placeholder={props.placeholder}
			       onChange={props.onChange} />

		</>
	);
};

export const TextAreaInput: React.FC<ITextAreaInput> = (props) => {

	let style = styles.TextAreaInput;

	if (props.hasError) {
		style = addStylesToClass(style, [styles.TextAreaInputWithError])
	}

	if (props.style) {
		style = addStylesToClass(style, [props.style]);
	}

	return (
		<>

			{ props.label && (
				<label>{props.label}</label>
			)}

			<textarea
				className={style}
				placeholder={props.placeholder}
				onChange={props.onChange}
				rows={15}
				value={props.value}
			/>

		</>
	);
}

export const SubmitButton: React.FC<ISubmitButton> = (props) => {

	let style = styles.SubmitButton;

	if (props.style) {
		style = addStylesToClass(style, [props.style]);
	}

	return (
		<button type={'button'}
		        className={style}
		        onClick={props.onClick}
		>
			{props.value}
		</button>
	);

};