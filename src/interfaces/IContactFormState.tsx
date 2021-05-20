interface ISender {
	email: string,
	emailError: null | string,
	name: string,
	nameError: null | string
}

interface IContactFormState {
	sender: ISender,
	messageContent: string,
	messageContentError: null | string,
	methods: {
		[key: string]: (e: any) => void
	}
}

export default IContactFormState;