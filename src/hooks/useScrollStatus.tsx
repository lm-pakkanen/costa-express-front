import { useEffect, useState } from 'react';

const useScrollStatus = (target: Document | Element = document) => {

	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {

		const handleScroll = () => {
			setScrolled(window.pageYOffset !== 0);
		};

		handleScroll();

		target.addEventListener('scroll', handleScroll);
		target.addEventListener('touchMove', handleScroll);

		return () => {
			target.removeEventListener('scroll', handleScroll);
			target.removeEventListener('touchMove', handleScroll);
		};

	}, [ target, scrolled ]);

	return scrolled;

};

export default useScrollStatus;