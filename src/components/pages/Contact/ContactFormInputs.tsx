import React from 'react';

import styles from './ContactFormInputs.module.css';
import { addStylesToClass } from '../../../helpers';

interface IInput {
	value: string,
	style?: string
}


interface ITextInput extends IInput {
	onChange: () => void
	placeholder?: string
	label?: string
}

interface ITextAreaInput extends IInput {
	onChange: () => void,
	placeholder?: string
	label?: string
}

interface ISubmitButton extends IInput {
	onClick: () => void
}

export const TextInput: React.FC<ITextInput> = (props) => {

	let style = styles.TextInput;

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
			>
				{props.value}
			</textarea>

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