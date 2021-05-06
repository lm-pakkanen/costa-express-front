interface ICError {
	errorClass: string,
	date?: string,
	name: string,
	code: number,
	message: string,
	isDisruptive: boolean
}

export default ICError;