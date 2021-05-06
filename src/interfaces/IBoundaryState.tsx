import ICError from './ICError';
import IFatalCError from './IFatalCError';

interface IState {
	hasError: boolean,
	shouldDisrupt: boolean,
	hasFatalError: boolean,
	errors: Array<ICError | IFatalCError>
}

export default IState;