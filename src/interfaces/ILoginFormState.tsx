interface IInput {
	value: string,
	error: string | undefined
}

interface ILoginState {
	email: IInput,
	password: IInput,
	error: string | undefined,
	[key: string]: any
}

interface IRegisterState {
	email: IInput,
	username: IInput,
	password: IInput,
	error: string | undefined,
	[key: string]: any
}

interface ILoginFormState {
	formType: string,
	isLoading: boolean,
	login: ILoginState,
	register: IRegisterState
}

export default ILoginFormState;