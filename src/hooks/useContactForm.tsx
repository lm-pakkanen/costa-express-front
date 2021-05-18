import React, { useState } from 'react';

import IContactFormState from '../interfaces/IContactFormState';

const useContactForm = (): IContactFormState => {

	const [senderEmail, setSenderEmail] = useState('');
	const [senderName, setSenderName] = useState('');
	const [messageContent, setMessageContent] = useState('');

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

		e.preventDefault();

		const emailTemplateID = '';

		const messageVariables = {
			sender_email: senderEmail,
			sender_name: senderName,
			message: messageContent
		};

		// TODO: implement form submission
	};

	return {
		sender: {
			email: senderEmail,
			name: senderName
		},
		messageContent: messageContent,
		methods: {
			onSenderEmailChange,
			onSenderNameChange,
			onMessageContentChange,
			onFormSubmit
		}
	};

};

export default useContactForm;