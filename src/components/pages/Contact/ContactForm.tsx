import React, { useEffect } from 'react';

import { TextInput, TextAreaInput, SubmitButton, FieldError } from './ContactFormInputs';

import styles from './ContactForm.module.css';
import inputStyles from './ContactFormInputs.module.css';

import { addStylesToClass } from '../../../helpers';
import useContactForm from '../../../hooks/controllers/useContactForm';
import IContactFormState from '../../../interfaces/IContactFormState';

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
		startDate,
		pickupAddress,
		pickupPhone,
		deliveryAddress,
		deliveryPhone,
		cargoDescription,
		messageContent,
		formError,
		formAlert,
		methods
	}: IContactFormState = contactForm;

	const {
		setStartDate,
		onFormChange,
		onFormSubmit
	} = methods;

	useEffect(() => {

		if (!startDate.value) {
			setStartDate(selectedDate);
		}

	}, [ startDate, setStartDate, selectedDate ]);

	useEffect(() => {

		if (formAlert) { alert(formAlert); }

	}, [ formAlert ]);

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

						<TextInput value={sender.firstName.value}
						           name={'firstName'}
						           label={'Nimi'}
						           placeholder={'Etunimi'}
						           hasError={sender.firstName.error !== null}
						           onChange={onFormChange}
						           required
						/>

						{
							sender.firstName.error &&
							<FieldError message={sender.firstName.error} />
						}

						<TextInput value={sender.lastName.value}
						           name={'lastName'}
						           placeholder={'Sukunimi'}
						           hasError={sender.lastName.error !== null}
						           onChange={onFormChange}
						           required
						/>

						{
							sender.lastName.error &&
							<FieldError message={sender.lastName.error} />
						}

					</div>

				</FieldRow>

				<FieldRow>

					<div>

						<TextInput value={sender.emailAddress.value}
						           name={'emailAddress'}
						           label={'Sähköpostiosoite'}
						           hasError={sender.emailAddress.error !== null}
						           onChange={onFormChange}
						           required
						/>

						{
							sender.emailAddress.error &&
							<FieldError message={sender.emailAddress.error} />
						}

					</div>

				</FieldRow>

				<FieldRow>

					<div>

						<TextInput value={startDate.value}
						           name={'startDate'}
						           label={'Kuljetuksen päivämäärä'}
						           descriptionAfter={'Valitaksesi eri kuljetuksen, palaa etusivulle.'}
						           readonly
						           required
						/>

					</div>

				</FieldRow>

				<FieldRow>

					<div>

						<TextInput value={pickupAddress.street.value}
						           name={'pickupAddressStreet'}
						           label={'Nouto-osoite'}
						           descriptionBefore={'Ilmoita rahdin nouto-osoite.'}
						           placeholder={'Katuosoite'}
						           hasError={pickupAddress.street.error !== null}
						           onChange={onFormChange}
						           required
						/>

						{
							pickupAddress.street.error &&
							<FieldError message={pickupAddress.street.error} />
						}

						<TextInput value={pickupAddress.zipAndCity.value}
						           name={'pickupAddressZipAndCity'}
						           placeholder={'Postinumero ja postitoimipaikka'}
						           hasError={pickupAddress.zipAndCity.error !== null}
						           onChange={onFormChange}
						           required
						/>

						{
							pickupAddress.zipAndCity.error &&
							<FieldError message={pickupAddress.zipAndCity.error} />
						}

						<TextInput value={pickupAddress.country.value}
						           name={'pickupAddressCountry'}
						           placeholder={'Maa'}
						           hasError={pickupAddress.country.error !== null}
						           onChange={onFormChange}
						           required
						/>

						{
							pickupAddress.country.error &&
							<FieldError message={pickupAddress.country.error} />
						}

						<TextInput value={pickupPhone.value}
						           placeholder={'Puhelinnumero'}
						           descriptionAfter={(
							           <>
								           <span>Käytä maakoodillista numeroa (+358...) </span>
							           </>
						           )}
						           name={'pickupPhone'}
						           hasError={pickupPhone.error !== null}
						           onChange={onFormChange}
						           required
						/>

						{
							pickupPhone.error &&
							<FieldError message={pickupPhone.error} />
						}

					</div>

				</FieldRow>

				<FieldRow>

					<div>

						<TextInput value={deliveryAddress.street.value}
						           name={'deliveryAddressStreet'}
						           label={'Toimitusosoite'}
						           descriptionBefore={'Ilmoita rahdin toimitusosoite.'}
						           placeholder={'Katuosoite'}
						           hasError={deliveryAddress.street.error !== null}
						           onChange={onFormChange}
						           required
						/>

						{
							deliveryAddress.street.error &&
							<FieldError message={deliveryAddress.street.error} />
						}

						<TextInput value={deliveryAddress.zipAndCity.value}
						           name={'deliveryAddressZipAndCity'}
						           placeholder={'Postinumero ja postitoimipaikka'}
						           hasError={deliveryAddress.zipAndCity.error !== null}
						           onChange={onFormChange}
						           required
						/>

						{
							deliveryAddress.zipAndCity.error &&
							<FieldError message={deliveryAddress.zipAndCity.error} />
						}

						<TextInput value={deliveryAddress.country.value}
						           name={'deliveryAddressCountry'}
						           placeholder={'Maa'}
						           hasError={deliveryAddress.country.error !== null}
						           onChange={onFormChange}
						           required
						/>

						{
							deliveryAddress.country.error &&
							<FieldError message={deliveryAddress.country.error} />
						}

						<TextInput value={deliveryPhone.value}
						           placeholder={'Puhelinnumero'}
						           descriptionAfter={(
							           <>
								           <span>Käytä maakoodillista numeroa (+358...) </span>
							           </>
						           )}
						           name={'deliveryPhone'}
						           hasError={deliveryPhone.error !== null}
						           onChange={onFormChange}
						           required
						/>

						{
							deliveryPhone.error &&
							<FieldError message={deliveryPhone.error} />
						}

					</div>

				</FieldRow>

				<FieldRow>

					<div>

						<TextAreaInput value={cargoDescription.value}
						               name={'cargoDescription'}
						               label={'Tiedot rahdista'}
						               descriptionAfter={'Kerro millaista rahtia, kuinka paljon, miten rahti on pakattu, ja miten painavia rahdattavat ovat.'}
						               hasError={cargoDescription.error !== null}
						               onChange={onFormChange}
						               rows={6}
						               required
						/>

						{
							cargoDescription.error &&
							<FieldError message={cargoDescription.error} />
						}

					</div>

				</FieldRow>

				<FieldRow>

					<div>

						<TextAreaInput value={messageContent.value}
						               name={'messageContent'}
						               label={'Vapaamuotoinen viesti (valinnainen)'}
						               hasError={messageContent.error !== null}
						               onChange={onFormChange}
						               rows={6}
						               required
						/>

						{
							messageContent.error &&
							<FieldError message={messageContent.error} />
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