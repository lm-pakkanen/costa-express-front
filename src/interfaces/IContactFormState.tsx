export interface IFormDataValue {
	value: null | string,
	error: null | string
}

interface IAddress {
	street: IFormDataValue,
	zipAndCity: IFormDataValue,
	country: IFormDataValue
}

interface ISender {
	firstName: IFormDataValue,
	lastName: IFormDataValue,
	emailAddress: IFormDataValue,
}

interface IContactFormState {
	sender: ISender,
	startDate: IFormDataValue,
	pickupAddress: IAddress,
	deliveryAddress: IAddress,
	cargoDescription: IFormDataValue,
	messageContent: IFormDataValue,
	formError: null | string,
	formAlert: null | string,
	methods: {
		[key: string]: (e: any) => void
	}
}

export default IContactFormState;