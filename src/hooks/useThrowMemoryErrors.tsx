import useMemoryController from '../hooks/controllers/useMemoryController';

/** Used to throw memory-stored errors earlier than App/Router */
const useThrowMemoryErrors = () => {

	const { getMemoryErrors, clearMemoryErrors } = useMemoryController();

	const errors = getMemoryErrors();

	if (errors.length !== 0) {
		clearMemoryErrors();
		throw errors;
	}

}

export default useThrowMemoryErrors;