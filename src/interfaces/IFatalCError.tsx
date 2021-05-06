interface IFatalCError {
	errorClass: string,
	date?: string,
	name: string,
	code: number,
	message: string,
	isFatal: boolean
}

export default IFatalCError;