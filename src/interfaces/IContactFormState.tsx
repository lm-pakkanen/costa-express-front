interface ISender {
	email: string,
	name: string
}

interface IContactFormState {
	sender: ISender,
	messageContent: string,
	methods: {
		[key: string]: (e: any) => void
	}
}

export default IContactFormState;