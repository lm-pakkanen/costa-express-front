import React, { useState } from 'react';

import emailjs from 'emailjs-com';

import IContactFormState from '../interfaces/IContactFormState';

const useContactForm = (): IContactFormState => {

	const [senderEmail, setSenderEmail] = useState('');
	const [senderEmailError, setSenderEmailError] = useState(null);

	const [senderName, setSenderName] = useState('');
	const [senderNameError, setSenderNameError] = useState(null);

	const [messageContent, setMessageContent] = useState('');
	const [messageContentError, setMessageContentError] = useState(null);

	const onSenderEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
		setSenderEmail(e.currentTarget.value);
	};

	const onSenderNameChange = (e: React.FormEvent<HTMLInputElement>) => {
		setSenderName(e.currentTarget.value);
	};

	const onMessageContentChange = (e: React.FormEvent<HTMLInputElement>) => {
		setMessageContent(e.currentTarget.value);
	};

	const onFormSubmit = (e: React.FormEvent<HTMLInputElement>) => {

		clearFormErrors();

		// TODO: Check validity of inputs
		// TODO: For security, move email variables to .env

		e.preventDefault();

		// TODO: Separate logic to controller

		const emailUserID = process.env.REACT_APP_EMAILJS_USER_ID;

		const emailProviderID = process.env.REACT_APP_EMAILJS_PROVIDER;
		const emailTemplateID = process.env.REACT_APP_EMAILJS_TEMPLATE;

		if (!(emailUserID && emailProviderID && emailTemplateID)) {
			// TODO: Handle error
			return;
		}

		const messageVariables = {
			sender_email: senderEmail,
			sender_name: senderName,
			message: messageContent
		};

		emailjs.init(emailUserID);

		emailjs.send(emailProviderID, emailTemplateID, messageVariables)
			.then(() => {
				// TODO: Handle successful submit
				console.debug('email sent');
			})
			.catch(() => {
				// TODO: Handle error
				console.debug('failed to send email');
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
		methods: {
			onSenderEmailChange,
			onSenderNameChange,
			onMessageContentChange,
			onFormSubmit
		}
	};

};

export default useContactForm;