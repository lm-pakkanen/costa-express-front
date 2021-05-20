import { useEffect, useState } from 'react';

const useScrollStatus = (target: Document | Element = document) => {

	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {

		const handleScroll = () => {
			setScrolled(window.scrollY !== 0);
		};

		handleScroll();

		target.addEventListener('scroll', handleScroll);

		return () => {
			target.removeEventListener('scroll', handleScroll);
		};

	}, [ scrolled ]);

	return scrolled;

};

export default useScrollStatus;