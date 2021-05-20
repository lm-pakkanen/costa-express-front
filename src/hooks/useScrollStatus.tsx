import { useEffect, useState } from 'react';

const useScrollStatus = () => {

	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {

		const handleScroll = () => {

			const isScrolled = window.scrollY !== 0;

			if (isScrolled !== scrolled) {
				setScrolled(isScrolled);
			}

		};

		handleScroll();

		document.addEventListener('scroll', handleScroll);

		return () => {
			document.removeEventListener('scroll', handleScroll);
		};

	}, [ scrolled ]);

	return scrolled;

};

export default useScrollStatus;