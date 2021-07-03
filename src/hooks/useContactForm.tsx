import React, { useState } from 'react';

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

	/*
	const onFormSubmit = (e: React.FormEvent<HTMLInputElement>) => {

		e.preventDefault();

		clearFormErrors();

		if (!validateFields()) { return; }

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

	};

	const validateFields = () => {

		let hasError = false;

		const emailValid = Validator.validateContactFormEmail(senderEmail);
		const nameValid = Validator.validateContactFormName(senderName);
		const messageValid = Validator.validateContactFormMessage(messageContent);

		if (!(typeof emailValid === 'boolean' && emailValid)) {
			setSenderEmailError(emailValid);
			hasError = true;
		}

		if (!(typeof nameValid === 'boolean' && nameValid)) {
			setSenderNameError(nameValid);
			hasError = true;
		}

		if (!(typeof messageValid === 'boolean' && messageValid)) {
			setMessageContentError(messageValid);
			hasError = true;
		}

		if (hasError) {
			return setFormError('Jossain kentässä on virheellistä tietoa.');
		}

		return true;

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

	*/

	const clearFormErrors = () => {

		setFormError(null);
		setFormAlert(null);

		Object.keys(formData).forEach((key: string) => {
			formData[key]['error'] = null;
		});

	};

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
			//onFormSubmit
		}
	};

};

export default useContactForm;