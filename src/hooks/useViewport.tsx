import { useEffect, useState } from 'react';
import { meta, navigation } from '../config/actions';

interface IViewportState {

}

const useViewport = (target: Window | Element = window, onResizedCallback: () => void): IViewportState => {

	// TODO: Variables
	const mobileWidth = 400;
	const tabletWidth = 800;

	const [viewportWidth, setViewportWidth] = useState(0);
	const [viewportHeight, setViewportHeight] = useState(0);

	const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

	useEffect(() => {

		const handleResize = () => {

			let _deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';

			if (window.innerWidth <= mobileWidth) {
				_deviceType = 'mobile';
			} else if (window.innerWidth <= tabletWidth) {
				_deviceType = 'tablet';
			}

			setDeviceType(_deviceType);

			/**
			 *  Allows for event-triggering when target is resized
			 */
			if (onResizedCallback) {
				onResizedCallback();
			}

		};

		handleResize();

		target.addEventListener('resize', handleResize);

		return () => {
			target.removeEventListener('resize', handleResize);
		}

	}, [
		          dispatch,
		          state.meta.viewport.deviceType,
		          state.meta.viewport.mobile_width,
		          state.meta.viewport.tablet_width
	          ]);

	return {

	};

}

export default useViewport;