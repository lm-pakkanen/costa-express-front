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

	return (
		<div className={style}>
			{ props.children}
		</div>
	);

};

const ContactForm: React.FC<Props> = () => {

	const urlParams = new URLSearchParams(window.location.search);

	const selectedDate = urlParams.get('date');

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

		<>

			<div className={styles.FormTitleWrapper}>
				<h1 className={styles.FormTitle}>
					Lähetä tarjouspyyntö kuljetukselle
				</h1>
				<h2 className={styles.FormDescription}>
					<span>
						Tällä lomakkeella voit lähettää tarjouspyynnön kuljetukselle.
					</span>
					<span>
						Ilmoitathan tiedot rahdista mahdollisimman tarkasti.
					</span>
				</h2>
			</div>

			<div className={styles.ContactForm}>

				<FieldRow>

					<div>

						<TextInput value={sender.name}
						           label={'Etu- ja sukunimi'}
						           placeholder={'Etunimi'}
						           hasError={sender.nameError !== null}
						           onChange={onSenderNameChange}
						/>

						{
							sender.nameError &&
							<FieldError message={sender.nameError} />
						}

						<TextInput value={sender.name}
						           placeholder={'Sukunimi'}
						           hasError={sender.nameError !== null}
						           onChange={onSenderNameChange}
						/>

						{
							sender.nameError &&
							<FieldError message={sender.nameError} />
						}

					</div>

				</FieldRow>

				<FieldRow>

					<div>

						<TextInput value={sender.email}
						           label={'Sähköpostiosoite'}
						           hasError={sender.emailError !== null}
						           onChange={onSenderEmailChange}
						/>

						{
							sender.emailError &&
							<FieldError message={sender.emailError} />
						}

					</div>

				</FieldRow>

				<FieldRow>

					<div>

						<TextInput value={selectedDate ?? ''}
						           label={'Kuljetuksen päivämäärä'}
						           descriptionAfter={'Valitaksesi eri kuljetuksen, palaa etusivulle.'}
						           readonly
						/>

					</div>

				</FieldRow>

				<FieldRow>

					<div>

						<TextInput value={''}
						           label={'Nouto-osoite'}
						           descriptionBefore={'Ilmoita rahdin nouto-osoite.'}
						           placeholder={'Katuosoite'}
						           hasError={null !== null}
						           onChange={() => {}}
						/>

						{
							'' &&
							<FieldError message={''} />
						}

						<TextInput value={''}
						           placeholder={'Postinumero ja postitoimipaikka'}
						           hasError={null !== null}
						           onChange={() => {}}
						/>

						{
							'' &&
							<FieldError message={''} />
						}

						<TextInput value={''}
						           placeholder={'Maa'}
						           hasError={null !== null}
						           onChange={() => {}}
						/>

						{
							'' &&
							<FieldError message={''} />
						}

					</div>

				</FieldRow>

				<FieldRow>

					<div>

						<TextInput value={''}
						           label={'Toimitusosoite'}
						           descriptionBefore={'Ilmoita rahdin toimitusosoite.'}
						           placeholder={'Katuosoite'}
						           hasError={null !== null}
						           onChange={() => {}}
						/>

						{
							'' &&
							<FieldError message={''} />
						}

						<TextInput value={''}
						           placeholder={'Postinumero ja postitoimipaikka'}
						           hasError={null !== null}
						           onChange={() => {}}
						/>

						{
							'' &&
							<FieldError message={''} />
						}

						<TextInput value={''}
						           placeholder={'Maa'}
						           hasError={null !== null}
						           onChange={() => {}}
						/>

						{
							'' &&
							<FieldError message={''} />
						}

					</div>

				</FieldRow>

				<FieldRow>

					<div>

						<TextAreaInput value={messageContent}
						               label={'Tiedot rahdista'}
						               descriptionAfter={'Kerro millaista rahtia, kuinka paljon, miten rahti on pakattu, ja miten painavia rahdattavat ovat.'}
						               hasError={messageContentError !== null}
						               onChange={onMessageContentChange}
						               rows={7}
						/>

						{
							messageContentError &&
							<FieldError message={messageContentError} />
						}

					</div>

				</FieldRow>

				<FieldRow>

					<div>

						<TextAreaInput value={''}
						               label={'Vapaamuotoinen viesti (valinnainen)'}
						               hasError={null !== null}
						               onChange={() => {}}
						               rows={4}
						/>

						{
							'' &&
							<FieldError message={''} />
						}

					</div>

				</FieldRow>

				<FieldRow style={styles.SubmitButtonRow}>

					<SubmitButton value={'Lähetä tarjouspyyntö'}
					              onClick={onFormSubmit}
					/>

				</FieldRow>

				{
					formError &&
					<FieldError message={formError} style={inputStyles.FormError} />
				}

			</div>

		</>

	);

};

export default ContactForm;