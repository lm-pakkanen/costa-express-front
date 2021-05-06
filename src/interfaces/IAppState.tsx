import IAuthState from './IAuthState';
import INavState from './INavState';
import IAppStateMeta from './IAppStateMeta';

interface IAppState {
	meta: IAppStateMeta,
	authentication: IAuthState,
	navigation: INavState
}

export default IAppState;