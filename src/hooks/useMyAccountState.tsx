import { useState } from 'react';

import IMyAccountState from '../interfaces/IMyAccountState';

const useMyAccountState = (): IMyAccountState => {

	const [selectedPage, setSelectedPage] = useState('myInformation');

	const sideNavPageHandler = (e: React.MouseEvent<HTMLInputElement>, id: string) => {

		e.preventDefault();

		if (selectedPage !== id) {
			setSelectedPage(id);
		}

	};

	return {
		selectedPage,
		sideNavPageHandler
	};
}

export default useMyAccountState;