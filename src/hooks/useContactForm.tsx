import React, { useEffect, useState } from 'react';

import emailjs from 'emailjs-com';

import { Validator } from '../helpers';

import IContactFormState, { IFormDataValue } from '../interfaces/IContactFormState';

interface IFormData {
	[key: string]: IFormDataValue
	/*firstName: IFormDataValue,
	lastName: IFormDataValue,
	emailAddress: IFormDataValue,
	startDate: IFormDataValue,
	pickupAddressStreet: IFormDataValue,
	pickupAddressZipAndCity: IFormDataValue,
	pickupAddressCountry: IFormDataValue,
	deliveryAddressStreet: IFormDataValue,
	deliveryAddressZipAndCity: IFormDataValue,
	deliveryAddressCountry: IFormDataValue,
	cargoDescription: IFormDataValue,
	messageContent: IFormDataValue*/
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
		deliveryAddressStreet: initialValue,
		deliveryAddressZipAndCity: initialValue,
		deliveryAddressCountry: initialValue,
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
		const deliveryAddressStreetError = errors.deliveryAddressStreet ?? null;
		const deliveryAddressZipAndCityError = errors.deliveryAddressZipAndCity ?? null;
		const deliveryAddressCountryError = errors.deliveryAddressCountry ?? null;
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

		if (!validateFields()) {  }

		/*

		const messageVariables = {
			sender_email: senderEmail,
			sender_name: senderName,
			message: messageContent
		};

		const emailUserID = process.env.REACT_APP_EMAILJS_USER_ID;

		const emailProviderID = process.env.REACT_APP_EMAILJS_PROVIDER;
		const emailTemplateID = process.env.REACT_APP_EMAILJS_TEMPLATE;

		/**
		 * Environment variables missing, email cannot be sent
		 *//*
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

			})

			*/

	};

	const validateFields = () => {

		const updateErrors = (state: IFormData, field: string, error: string) => {

			return {
				...state,
				[field]: error
			};

		};

		const data = getFormData();

		const emailValid = Validator.validateContactFormEmail(data.sender.emailAddress.value);
		const firstNameValid = Validator.validateContactFormName(data.sender.firstName.value);
		const lastNameValid = Validator.validateContactFormName(data.sender.lastName.value);
		const messageValid = Validator.validateContactFormMessage(data.messageContent.value);

		let errors = {};

		let hasError = false;

		if (!(typeof emailValid === 'boolean' && emailValid)) {
			errors = updateErrors(errors, 'emailAddress', emailValid);
			hasError = true;
		}

		if (!(typeof firstNameValid === 'boolean' && firstNameValid)) {
			errors = updateErrors(errors, 'firstName', firstNameValid);
			hasError = true;
		}

		if (!(typeof lastNameValid === 'boolean' && lastNameValid)) {
			errors = updateErrors(errors, 'lastName', lastNameValid);
			hasError = true;
		}

		if (!(typeof messageValid === 'boolean' && messageValid)) {
			errors = updateErrors(errors, 'messageContent', messageValid);
			hasError = true;
		}

		if (hasError) { setErrors(errors) }

		return hasError ? setFormError('Jossain kentässä on virheellistä tietoa.') : true;
	};

	const sendEmail = async (userID: string, providerID: string, templateID: string, variables: { [key: string]: string }) => {
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

	const getFormData = () => {
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
			deliveryAddress: {
				street: formData.deliveryAddressStreet,
				zipAndCity: formData.deliveryAddressZipAndCity,
				country: formData.deliveryAddressCountry
			},
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