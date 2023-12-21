import { StatusCodes } from "@nx-starter/shared";

const success = <T>(data: T, message?: string | undefined) => {
  return {
    body: {
      data,
      message: message ? message : "Success",
      status: StatusCodes.SUCCESS,
    },
    status: StatusCodes.SUCCESS,
  };
};

const forbidden = <T>(error: T, message?: string | undefined) => {
  return {
    body: {
      error,
      message: message ? message : `Server error with status ${StatusCodes.FORBIDDEN}. Forbidden`,
      status: StatusCodes.FORBIDDEN,
    },
    status: StatusCodes.FORBIDDEN,
  };
};

const notFound = <T>(error: T, message?: string | undefined) => {
  return {
    body: {
      error,
      message: message ? message : `Server error with status ${StatusCodes.NOT_FOUND}. Not Found`,
      status: StatusCodes.NOT_FOUND,
    },
    status: StatusCodes.NOT_FOUND,
  };
};

const serverError = <T>(error: T, message?: string | undefined) => {
  return {
    body: {
      error,
      message: message ? message : `Server error with status ${StatusCodes.SERVER_ERROR}. Server Error`,
      status: StatusCodes.SERVER_ERROR,
    },
    status: StatusCodes.SERVER_ERROR,
  };
};

const customError = <T>(error: T, status: number, message?: string | undefined) => {
  return {
    body: {
      error,
      message: message ? message : `Server error with status ${customError}`,
      status,
    },
    status,
  };
};

export const response = {
  customError,
  forbidden,
  notFound,
  serverError,
  success,
};
