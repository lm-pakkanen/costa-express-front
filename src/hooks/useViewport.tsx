import { useEffect, useState } from 'react';

type IDeviceType = 'mobile' | 'tablet' | 'desktop';

interface IViewportState {
	viewport: {
		width: number,
		height: number
	},
	deviceType: IDeviceType
}

const useViewport = (onResizedCallback: () => void): IViewportState => {

	// TODO: Variables
	const mobileWidth = 400;
	const tabletWidth = 800;

	const [viewportWidth, setViewportWidth] = useState(0);
	const [viewportHeight, setViewportHeight] = useState(0);

	const [deviceType, setDeviceType] = useState<IDeviceType>('mobile');

	useEffect(() => {

		const handleResize = () => {

			let _deviceType: IDeviceType = 'desktop';

			if (window.innerWidth <= mobileWidth) {
				_deviceType = 'mobile';
			} else if (window.innerWidth <= tabletWidth) {
				_deviceType = 'tablet';
			}

			setDeviceType(_deviceType);

			setViewportWidth(window.innerWidth);
			setViewportHeight(window.innerHeight);

			/**
			 *  Allows for event-triggering when target is resized
			 */
			if (onResizedCallback) {
				onResizedCallback();
			}

		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		}

	}, [ mobileWidth, tabletWidth ]);

	return {
		viewport: {
			width: viewportWidth,
			height: viewportHeight
		},
		deviceType
	};

}

export default useViewport;