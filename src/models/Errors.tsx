import moment from 'moment-timezone';

import ICError from '../interfaces/ICError';
import IFatalCError from '../interfaces/IFatalCError';

export class CError extends Error implements ICError {

	errorClass;
	date;
	name;
	code;
	message;
	isDisruptive;

	constructor(message: string, code: number = 500, isDisruptive = true, name = 'CError', ...rest: any[]) {

		super(...rest);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, CError);
		}

		const tz = moment.tz.guess();

		this.errorClass = 'CError';

		this.date = moment.tz(tz).utc().format('DD/MM/YYYY HH:mm:ss @Z (z)');
		this.name = name;
		this.code = code;
		this.message = message;
		this.isDisruptive = isDisruptive;

	}
}

export class FatalCError extends Error implements IFatalCError {

	errorClass = 'FatalCError';
	date;
	name;
	code;
	message;
	isFatal;

	constructor(message: string, code: number = 500, name = 'FatalCError', ...rest: any[]) {

		super(...rest);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, FatalCError);
		}

		const tz = moment.tz.guess();

		this.date = moment.tz(tz).utc().format('DD/MM/YYYY HH:mm:ss @Z (z)');
		this.name = name;
		this.code = code;
		this.message = message;

		this.isFatal = true;

	}

}