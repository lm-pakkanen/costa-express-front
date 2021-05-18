import React from 'react';

import PageBoundary from '../components/boundaries/PageBoundary';

import Page from '../components/pages/Page';
import ContactContainer from '../components/pages/Contact/ContactContainer';
import ContactForm from '../components/pages/Contact/ContactForm';

import styles from './Contact.module.css';

interface Props {}

const Contact: React.FC<Props> = () => {


	return (
		<PageBoundary>

			<Page style={styles.Contact}>

				<ContactContainer>

					<ContactForm />

				</ContactContainer>

			</Page>

		</PageBoundary>
	);

};

export default Contact;