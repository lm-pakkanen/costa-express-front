interface IMyAccountState {
	selectedPage: string,
	sideNavPageHandler: (e: React.MouseEvent<HTMLInputElement>, id: string) => void
}

export default IMyAccountState;