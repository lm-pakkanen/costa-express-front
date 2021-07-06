import React, { useEffect, useState } from 'react';

import emailjs from 'emailjs-com';

import { Validator } from '../helpers';

import IContactFormState, { IFormDataValue } from '../interfaces/IContactFormState';

interface IFormData {
	[key: string]: IFormDataValue
}

const useContactForm = (): IContactFormState => {

	const [formError, setFormError] = useState<null | string>(null);
	const [formAlert, setFormAlert] = useState<null | string>(null);

	const initialValue: IFormDataValue = {
		value: null,
		error: null
	};

	const initialFormData: IFormData = {
		firstName: initialValue,
		lastName: initialValue,
		emailAddress: initialValue,
		startDate: initialValue,
		pickupAddressStreet: initialValue,
		pickupAddressZipAndCity: initialValue,
		pickupAddressCountry: initialValue,
		pickupPhone: initialValue,
		deliveryAddressStreet: initialValue,
		deliveryAddressZipAndCity: initialValue,
		deliveryAddressCountry: initialValue,
		deliveryPhone: initialValue,
		cargoDescription: initialValue,
		messageContent: initialValue
	};

	const [formData, setFormData] = useState<IFormData>(initialFormData);

	const setStartDate = (value: string) => {
		setFormData({ ...formData, startDate: { ...formData.startDate, value } })
	};

	const onFormChange = (e:  React.FormEvent<HTMLInputElement>) => {
		setFormError(null);
		setFormAlert(null);
		setFormData({ ...formData, [e.currentTarget.name]: { value: e.currentTarget.value, error: null } });
	};

	const setErrors = (errors: { [key: string]: string }) => {

		const firstNameError = errors.firstName ?? null;
		const lastNameError = errors.lastName ?? null;
		const emailError = errors.emailAddress ?? null;
		const pickupAddressStreetError = errors.pickupAddressStreet ?? null;
		const pickupAddressZipAndCityError = errors.pickupAddressZipAndCity ?? null;
		const pickupAddressCountryError = errors.pickupAddressCountry ?? null;
		const pickupPhoneError = errors.pickupPhone ?? null;
		const deliveryAddressStreetError = errors.deliveryAddressStreet ?? null;
		const deliveryAddressZipAndCityError = errors.deliveryAddressZipAndCity ?? null;
		const deliveryAddressCountryError = errors.deliveryAddressCountry ?? null;
		const deliveryPhoneError = errors.deliveryPhone ?? null;
		const cargoDescriptionError = errors.cargoDescription ?? null;
		const messageContentError = errors.messageContent ?? null;

		const newState = {
			...formData,
			firstName: {
				...formData.firstName,
				error: firstNameError
			},
			lastName: {
				...formData.lastName,
				error: lastNameError
			},
			emailAddress: {
				...formData.emailAddress,
				error: emailError
			},
			pickupAddressStreet: {
				...formData.pickupAddressStreet,
				error: pickupAddressStreetError
			},
			pickupAddressZipAndCity: {
				...formData.pickupAddressZipAndCity,
				error: pickupAddressZipAndCityError
			},
			pickupAddressCountry: {
				...formData.pickupAddressCountry,
				error: pickupAddressCountryError
			},
			pickupPhone: {
				...formData.pickupPhone,
				error: pickupPhoneError
			},
			deliveryAddressStreet: {
				...formData.deliveryAddressStreet,
				error: deliveryAddressStreetError
			},
			deliveryAddressZipAndCity: {
				...formData.deliveryAddressZipAndCity,
				error: deliveryAddressZipAndCityError
			},
			deliveryAddressCountry: {
				...formData.deliveryAddressCountry,
				error: deliveryAddressCountryError
			},
			deliveryPhone: {
				...formData.deliveryPhone,
				error: deliveryPhoneError
			},
			cargoDescription: {
				...formData.cargoDescription,
				error: cargoDescriptionError
			},
			messageContent: {
				...formData.messageContent,
				error: messageContentError
			},
		}

		setFormData(newState);

	};


	const onFormSubmit = (e: React.FormEvent<HTMLInputElement>) => {

		e.preventDefault();

		clearFormErrors();

		const data = getFormData();

		if (!validateFields(data)) { return;  }

		const messageVariables = {
			senderFirstName: data.sender.firstName.value,
			senderLastName: data.sender.lastName.value,
			senderEmailAddress: data.sender.emailAddress.value,
			startDate: data.startDate.value,
			pickupAddressStreet: data.pickupAddress.street.value,
			pickupAddressZipAndCity: data.pickupAddress.zipAndCity.value,
			pickupAddressCountry: data.pickupAddress.country.value,
			pickupPhone: data.pickupPhone.value,
			deliveryAddressStreet: data.deliveryAddress.street.value,
			deliveryAddressZipAndCity: data.deliveryAddress.zipAndCity.value,
			deliveryAddressCountry: data.deliveryAddress.country.value,
			deliveryPhone: data.deliveryPhone.value,
			cargoDescription: data.cargoDescription.value,
			messageContent: data.messageContent.value,
		};

		const emailUserID = process.env.REACT_APP_EMAILJS_USER_ID;

		const emailProviderID = process.env.REACT_APP_EMAILJS_PROVIDER;
		const emailTemplateID = process.env.REACT_APP_EMAILJS_TEMPLATE;

		/**
		 * Environment variables missing, email cannot be sent
		 */
		if (!(emailUserID && emailProviderID && emailTemplateID)) {
			const errMessage = 'Sähköpostin lähettäminen ei onnistunut. Yritäthän myöhemmin uudelleen!';
			setFormAlert(errMessage);
			setFormError(errMessage);
			return;
		}

		sendEmail(emailUserID, emailProviderID, emailTemplateID, messageVariables)
			.then(() => {
				setFormAlert('Sähköpostisi on lähetetty! Vastaamme viestiin mahdollisimman pian.');
			})
			.catch((err) => {

				console.error(err);
				const errMessage = 'Sähköpostin lähettäminen ei onnistunut. Yritäthän myöhemmin uudelleen!';
				setFormAlert(errMessage);
				setFormError(errMessage);

			});

	};

	const validateFields = (data: IContactFormState) => {

		const updateErrors = (state: IFormData, field: string, error: string) => {

			return {
				...state,
				[field]: error
			};

		};

		const emailValid = Validator.validateContactFormEmail(data.sender.emailAddress.value);
		const firstNameValid = Validator.validateContactFormName(data.sender.firstName.value);
		const lastNameValid = Validator.validateContactFormName(data.sender.lastName.value);

		const pickupStreetValid = Validator.validateAddressStreet(data.pickupAddress.street.value);
		const pickupZipAndCityValid = Validator.validateAddressZip(data.pickupAddress.zipAndCity.value);
		const pickupCountryValid = Validator.validateAddressCountry(data.pickupAddress.country.value);

		const deliveryStreetValid = Validator.validateAddressStreet(data.deliveryAddress.street.value);
		const deliveryZipAndCityValid = Validator.validateAddressZip(data.deliveryAddress.zipAndCity.value);
		const deliveryCountryValid = Validator.validateAddressCountry(data.deliveryAddress.country.value);

		const cargoMessageValid = Validator.validateContactFormCargoInformation(data.cargoDescription.value);
		const messageValid = Validator.validateContactFormMessage(data.messageContent.value);

		// TODO: Validate rest of the fields

		let errors = {};

		let hasError = false;

		/** Email address */

		if (!(typeof emailValid === 'boolean' && emailValid)) {
			errors = updateErrors(errors, 'emailAddress', emailValid);
			hasError = true;
		}

		/** First- and last name */

		if (!(typeof firstNameValid === 'boolean' && firstNameValid)) {
			errors = updateErrors(errors, 'firstName', firstNameValid);
			hasError = true;
		}

		if (!(typeof lastNameValid === 'boolean' && lastNameValid)) {
			errors = updateErrors(errors, 'lastName', lastNameValid);
			hasError = true;
		}

		/** Pickup address */

		if (!(typeof pickupStreetValid === 'boolean' && pickupStreetValid)) {
			errors = updateErrors(errors, 'pickupAddressStreet', pickupStreetValid);
			hasError = true;
		}

		if (!(typeof pickupZipAndCityValid === 'boolean' && pickupZipAndCityValid)) {
			errors = updateErrors(errors, 'pickupAddressZipAndCity', pickupZipAndCityValid);
			hasError = true;
		}

		if (!(typeof pickupCountryValid === 'boolean' && pickupCountryValid)) {
			errors = updateErrors(errors, 'pickupAddressCountry', pickupCountryValid);
			hasError = true;
		}

		/** Delivery address */

		if (!(typeof deliveryStreetValid === 'boolean' && deliveryStreetValid)) {
			errors = updateErrors(errors, 'deliveryAddressStreet', deliveryStreetValid);
			hasError = true;
		}

		if (!(typeof deliveryZipAndCityValid === 'boolean' && deliveryZipAndCityValid)) {
			errors = updateErrors(errors, 'deliveryAddressZipAndCity', deliveryZipAndCityValid);
			hasError = true;
		}

		if (!(typeof deliveryCountryValid === 'boolean' && deliveryCountryValid)) {
			errors = updateErrors(errors, 'deliveryAddressCountry', deliveryCountryValid);
			hasError = true;
		}

		/** Cargo description */

		if (!(typeof cargoMessageValid === 'boolean' && cargoMessageValid)) {
			errors = updateErrors(errors, 'cargoDescription', cargoMessageValid);
			hasError = true;
		}

		/** Message content */

		if (!(typeof messageValid === 'boolean' && messageValid)) {
			errors = updateErrors(errors, 'messageContent', messageValid);
			hasError = true;
		}

		if (hasError) { setErrors(errors) }

		return hasError ? setFormError('Jossain kentässä on virheellistä tietoa.') : true;
	};

	const sendEmail = async (userID: string, providerID: string, templateID: string, variables: { [key: string]: null | string }) => {
		return new Promise(async (resolve, reject) => {

			try {
				await emailjs.send(providerID, templateID, variables, userID);
				resolve(true);
			} catch (err) {
				reject(err);
			}

		});

	};

	const clearFormErrors = () => {

		setFormError(null);
		setFormAlert(null);

		Object.keys(formData).forEach((key: string) => {
			formData[key]['error'] = null;
		});

	};

	const getFormData = (): IContactFormState => {
		return {
			sender: {
				firstName: formData.firstName,
				lastName: formData.lastName,
				emailAddress: formData.emailAddress
			},
			startDate: formData.startDate,
			pickupAddress: {
				street: formData.pickupAddressStreet,
				zipAndCity: formData.pickupAddressZipAndCity,
				country: formData.pickupAddressCountry
			},
			pickupPhone: formData.pickupPhone,
			deliveryAddress: {
				street: formData.deliveryAddressStreet,
				zipAndCity: formData.deliveryAddressZipAndCity,
				country: formData.deliveryAddressCountry
			},
			deliveryPhone: formData.deliveryPhone,
			cargoDescription: formData.cargoDescription,
			messageContent: formData.messageContent,
			formError,
			formAlert,
			methods: {
				setStartDate,
				onFormChange,
				onFormSubmit
			}
		};
	}

	return getFormData();

};

export default useContactForm;