import React from 'react';

import styles from './ContactFormInputs.module.css';
import { addStylesToClass } from '../../../helpers';

interface IInput {
	value: null | string,
	name?: string,
	style?: string,
	descriptionBefore?: string | React.ReactElement,
	descriptionAfter?: string | React.ReactElement,
	hasError?: boolean
	readonly?: boolean
	required?: boolean
}


interface ITextInput extends IInput {
	onChange?: (e: any) => void
	placeholder?: string,
	label?: string,
}

interface ITextAreaInput extends IInput {
	onChange?: (e: any) => void,
	rows: number,
	placeholder?: string,
	label?: string
}

interface ISubmitButton extends IInput {
	onClick: (e: any) => void,
	shouldLoadingShow: boolean
}

interface IFieldError {
	style?: string,
	message: string
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
				<label className={styles.FieldLabel}>
					{ props.label }
				</label>
			)}

			{ props.descriptionBefore && (
				<span className={addStylesToClass(styles.FieldDescription, [styles.TextInputFieldDescription])}>
					{ props.descriptionBefore }
				</span>
			)}

			<input type={'text'}
			       name={props.name}
			       className={style}
			       value={props.value ?? ''}
			       placeholder={props.placeholder}
			       onChange={props.onChange}
			       readOnly={props.readonly}
			       required={props.readonly}
			/>

			{ props.descriptionAfter && (
				<span className={addStylesToClass(styles.FieldDescription, [styles.TextInputFieldDescription])}>
					{ props.descriptionAfter }
				</span>
			)}

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
				<label className={styles.FieldLabel}>
					{ props.label }
				</label>
			)}

			{ props.descriptionBefore && (
				<span className={styles.FieldDescription}>
					{ props.descriptionBefore }
				</span>
			)}

			<textarea
				name={props.name}
				className={style}
				placeholder={props.placeholder}
				onChange={props.onChange}
				rows={props.rows}
				value={props.value ?? ''}
				readOnly={props.readonly}
				required={props.readonly}
			/>

			{ props.descriptionAfter && (
				<span className={styles.FieldDescription}>
					{ props.descriptionAfter }
				</span>
			)}

		</>
	);
}

export const SubmitButton: React.FC<ISubmitButton> = (props) => {

	let style = styles.SubmitButton;

	if (props.style) {
		style = addStylesToClass(style, [props.style]);
	}

	if (props.shouldLoadingShow) {
		style = addStylesToClass(style, [styles.loading]);
	}

	return (
		<button type={'button'}
		        name={props.name}
		        className={style}
		        onClick={props.onClick}
		>
			{ props.shouldLoadingShow
				?
				'Lähetetään tarjouspyyntöä...'
				:
				props.value
			}
		</button>
	);

};

export const FieldError: React.FC<IFieldError> = (props) => {

	let style = styles.FieldError;

	if (props.style) {
		style = addStylesToClass(style, [props.style]);
	}

	return (
		<div className={style}>
			{props.message}
		</div>
	);

};