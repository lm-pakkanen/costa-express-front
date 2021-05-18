import React from 'react';

import { TextInput, TextAreaInput, SubmitButton } from './ContactFormInputs';

import styles from './ContactForm.module.css';
import { addStylesToClass } from '../../../helpers';
import useContactForm from '../../../hooks/useContactForm';

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

	const contactForm = useContactForm();

	const { sender, messageContent, methods } = contactForm;

	const {
		onSenderEmailChange,
		onSenderNameChange,
		onMessageContentChange,
		onFormSubmit
	} = methods;

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

				<TextInput value={sender.email}
				           placeholder={'Sähköpostiosoite'}
				           label={'Sähköpostiosoite'}
				           onChange={onSenderEmailChange}
				/>

			</FieldRow>

			<FieldRow>

				<TextInput value={sender.name}
				           placeholder={'Etu- ja sukunimi'}
				           label={'Etu- ja sukunimi'}
				           onChange={onSenderNameChange}
				/>

			</FieldRow>

			<FieldRow>

				<TextAreaInput value={messageContent}
				               label={'Viesti'}
				               onChange={onMessageContentChange}
				/>

			</FieldRow>

			<FieldRow style={styles.SubmitButtonRow}>

				<SubmitButton value={'Lähetä viesti'}
				              onClick={onFormSubmit}
				/>

			</FieldRow>

		</div>
	);

};

export default ContactForm;