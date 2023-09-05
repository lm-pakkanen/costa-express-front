import { CError, FatalCError } from "../../models/Errors";

import ICError from "../../interfaces/ICError";
import IFatalCError from "../../interfaces/IFatalCError";

let memoryDomain = "";

if (process.env.REACT_APP_IS_STAGING === "true") {
  memoryDomain = process.env.REACT_APP_MEMORY_DOMAIN_STAGING ?? "";
} else {
  if (process.env.NODE_ENV === "development") {
    memoryDomain = process.env.REACT_APP_MEMORY_DOMAIN_DEV ?? "";
  } else {
    memoryDomain = process.env.REACT_APP_MEMORY_DOMAIN ?? "";
  }
}

export interface IUSeMemoryController {
  storeCookieConsent: (
    isCookiesAccepted: boolean,
    cookiesLevel: number
  ) => void;
  getCookieConsent: () => GetCookieConsentResult;
  getMemoryErrors: () => Array<ICError | IFatalCError>;
  addMemoryError: (error: ICError | IFatalCError) => void;
  clearMemoryErrors: () => void;
}

type GetCookieConsentResult = IGetCookieConsent | undefined;

interface IGetCookieConsent {
  isCookiesAccepted: boolean;
  cookiesLevel: number;
}

const useMemoryController = (): IUSeMemoryController => {
  /** Stores user's cookie consent values */
  const storeCookieConsent = (
    isCookiesAccepted: boolean,
    cookiesLevel: number
  ) => {
    const data = { isCookiesAccepted, cookiesLevel };
    localStorage.setItem(
      `${memoryDomain}/user-cookie-data`,
      JSON.stringify(data)
    );
  };
  const getCookieConsent = (): GetCookieConsentResult => {
    const data = localStorage.getItem(`${memoryDomain}/user-cookie-data`);
    if (!data) {
      return undefined;
    }
    return JSON.parse(data);
  };

  const getMemoryErrors = (): Array<ICError | IFatalCError> => {
    const errorsString = localStorage.getItem(`${memoryDomain}/errors`);
    let errors: Array<ICError | IFatalCError> = errorsString
      ? JSON.parse(errorsString)
      : [];

    if (errors.length !== 0) {
      errors = errors.map((error: ICError | IFatalCError) => {
        if (error.errorClass === "CError") {
          let isDisruptive;

          if ("isDisruptive" in error) {
            isDisruptive = error.isDisruptive;
          }

          return new CError(
            error.message,
            error.code,
            isDisruptive,
            error.name
          );
        } else {
          return new FatalCError(error.message, error.code, error.name);
        }
      });
    }

    return errors;
  };

  const addMemoryError = (error: ICError | IFatalCError) => {
    let errs = getMemoryErrors();
    errs = errs.concat(error);
    localStorage.setItem(`${memoryDomain}/errors`, JSON.stringify(errs));
  };

  const clearMemoryErrors = () => {
    localStorage.removeItem(`${memoryDomain}/errors`);
  };

  return {
    storeCookieConsent,
    getCookieConsent,
    getMemoryErrors,
    addMemoryError,
    clearMemoryErrors,
  };
};

export default useMemoryController;
