import { CError, FatalCError } from '../models/Errors';

export type AnyErrorArray = Array<Error | CError | FatalCError>;
export type AnyError = Error | CError | FatalCError;

export type AnyCustomErrorArray = Array<CError | FatalCError>;
export type AnyCustomError = CError | FatalCError;

export type SupportedLangs = 'fi' | 'en';