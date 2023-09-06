import constants from "../config/constants";

export const getHref = (path: string): URL => {
  const base = constants.BASE_URI;
  const basePath = constants.BASE_PATH;

  return new URL(`${basePath}${path.startsWith("/") ? "" : "/"}${path}`, base);
};
