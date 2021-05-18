import React from 'react';

import { TextInput, TextAreaInput, SubmitButton } from './ContactFormInputs';

import styles from './ContactForm.module.css';
import { addStylesToClass } from '../../../helpers';

interface Props {}

interface IFieldRow {
	style?: string
}

const FieldRow: React.FC<IFieldRow> = (props) => {

	let style = styles.FieldRow;

	if (props.style) {
		style = addStylesToClass(style, [props.style]);
	}

	return <div className={style}>{props.children}</div>

};

const ContactForm: React.FC<Props> = () => {

	return (
		<div className={styles.ContactForm}>

			<FieldRow>
				<h1 className={styles.FormTitle}>
					Ota meihin yhteyttä!
				</h1>
				<h2 className={styles.FormDescription}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</h2>
			</FieldRow>

			<FieldRow>

				<TextInput value={''}
				           placeholder={'Sähköpostiosoite'}
				           label={'Sähköpostiosoite'}
				           onChange={() => {console.log('changed')}}
				/>

			</FieldRow>

			<FieldRow>

				<TextInput value={''}
				           placeholder={'Etu- ja sukunimi'}
				           label={'Etu- ja sukunimi'}
				           onChange={() => {console.log('changed')}}
				/>

			</FieldRow>

			<FieldRow>

				<TextAreaInput value={''}
				               label={'Viesti'}
				               onChange={() => {console.log('changed')}}
				/>

			</FieldRow>

			<FieldRow style={styles.SubmitButtonRow}>

				<SubmitButton value={'Lähetä viesti'}
				              onClick={() => {console.log('clicked')}}
				/>

			</FieldRow>

		</div>
	);

};

export default ContactForm;