import ICError from './ICError';
import IFatalCError from './IFatalCError';
import { SupportedLangs } from './types';

interface IAppStateMeta {
	path: string,
	isCookiesAccepted: boolean,
	cookiesLevel: number,
	viewport: {
		isScrolled: boolean | undefined,
		deviceType: 'desktop' | 'tablet' | 'mobile',
		tablet_width?: number,
		mobile_width?: number,
	}
	errors: Array<ICError | IFatalCError>,
	language: SupportedLangs
}

export default IAppStateMeta;