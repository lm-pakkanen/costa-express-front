import constants from "../config/constants";

export const getPath = (path: string) => {
  const basePath = constants.BASE_PATH;

  return `${basePath}${path}`;
};
