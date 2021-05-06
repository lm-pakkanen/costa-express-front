import { useEffect } from 'react';

export const useCallbackOnEnter = (callback: () => void, shouldEventPrevent = true) => {

	useEffect(() => {

		const listener = (e: KeyboardEvent) => {

			if (e.code === 'Enter' || e.code === 'NumpadEnter') {

				if (shouldEventPrevent) {
					e.preventDefault();
					e.stopPropagation();
				}

				callback();
			}

		}

		document.addEventListener('keydown', listener);

		return () => {
			document.removeEventListener('keydown', listener);
		};

	}, [ callback, shouldEventPrevent ]);

}