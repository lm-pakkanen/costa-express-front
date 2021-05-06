import INavState from './INavState';
import IAppStateMeta from './IAppStateMeta';

interface IAppState {
	meta: IAppStateMeta,
	navigation: INavState
}

export default IAppState;