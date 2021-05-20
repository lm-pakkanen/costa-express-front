import React from 'react';

import { TextInput, TextAreaInput, SubmitButton, FieldError } from './ContactFormInputs';

import styles from './ContactForm.module.css';
import inputStyles from './ContactFormInputs.module.css';

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

	const {
		sender,
		messageContent,
		messageContentError,
		methods,
		formError,
		formAlert
	} = contactForm;

	const {
		onSenderEmailChange,
		onSenderNameChange,
		onMessageContentChange,
		onFormSubmit
	} = methods;

	if (formAlert) {
		alert(formAlert);
	}

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
				           hasError={sender.emailError !== null}
				           onChange={onSenderEmailChange}
				/>

				{
					sender.emailError &&
					<FieldError message={sender.emailError} />
				}

			</FieldRow>

			<FieldRow>

				<TextInput value={sender.name}
				           placeholder={'Etu- ja sukunimi'}
				           label={'Etu- ja sukunimi'}
				           hasError={sender.nameError !== null}
				           onChange={onSenderNameChange}
				/>

				{
					sender.nameError &&
					<FieldError message={sender.nameError} />
				}

			</FieldRow>

			<FieldRow>

				<TextAreaInput value={messageContent}
				               label={'Viesti'}
				               hasError={messageContentError !== null}
				               onChange={onMessageContentChange}
				/>

				{
					messageContentError &&
					<FieldError message={messageContentError} />
				}

			</FieldRow>

			{
				formError &&
				<FieldRow>
					<FieldError message={formError} style={inputStyles.FormError} />
				</FieldRow>
			}

			<FieldRow style={styles.SubmitButtonRow}>

				<SubmitButton value={'Lähetä viesti'}
				              onClick={onFormSubmit}
				/>

			</FieldRow>

		</div>
	);

};

export default ContactForm;