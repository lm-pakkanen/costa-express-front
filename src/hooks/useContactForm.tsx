import React, { useState } from 'react';

import emailjs from 'emailjs-com';

import { Validator } from '../helpers';

import IContactFormState from '../interfaces/IContactFormState';

const useContactForm = (): IContactFormState => {

	const [formError, setFormError] = useState<null | string>(null);
	const [formAlert, setFormAlert] = useState<null | string>(null);

	const [senderEmail, setSenderEmail] = useState('');
	const [senderEmailError, setSenderEmailError] = useState<null | string>(null);

	const [senderName, setSenderName] = useState('');
	const [senderNameError, setSenderNameError] = useState<null | string>(null);

	const [messageContent, setMessageContent] = useState('');
	const [messageContentError, setMessageContentError] = useState<null | string>(null);

	const onSenderEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
		setSenderEmailError(null);
		setSenderEmail(e.currentTarget.value);
	};

	const onSenderNameChange = (e: React.FormEvent<HTMLInputElement>) => {
		setSenderNameError(null);
		setSenderName(e.currentTarget.value);
	};

	const onMessageContentChange = (e: React.FormEvent<HTMLInputElement>) => {
		setMessageContentError(null);
		setMessageContent(e.currentTarget.value);
	};

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

			})

	};

	const validateFields = () => {

		const emailValid = Validator.validateEmail(senderEmail);

		if (!(typeof emailValid === 'boolean' && emailValid)) {
			setFormError(emailValid);
			setSenderEmailError(emailValid);
			return;
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

	const clearFormErrors = () => {
		setSenderEmailError(null);
		setSenderNameError(null);
		setMessageContentError(null);
	};

	return {
		sender: {
			email: senderEmail,
			emailError: senderEmailError,
			name: senderName,
			nameError: senderNameError
		},
		messageContent: messageContent,
		messageContentError: messageContentError,
		formError,
		formAlert,
		methods: {
			onSenderEmailChange,
			onSenderNameChange,
			onMessageContentChange,
			onFormSubmit
		}
	};

};

export default useContactForm;