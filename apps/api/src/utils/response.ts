const success = <T>(data: T, message?: string | undefined) => {
  return {
    body: {
      data,
      message: message ? message : "Success",
      status: 200 as const,
    },
    status: 200 as const,
  };
};

const forbidden = <T>(error: T, message?: string | undefined) => {
  return {
    body: {
      error,
      message: message ? message : "Server error with status 403. Forbidden",
      status: 403 as const,
    },
    status: 403 as const,
  };
};

const notFound = <T>(error: T, message?: string | undefined) => {
  return {
    body: {
      error,
      message: message ? message : "Server error with status 404. Not Found",
      status: 404 as const,
    },
    status: 404 as const,
  };
};

const serverError = <T>(error: T, message?: string | undefined) => {
  return {
    body: {
      error,
      message: message ? message : "Server error with status 500. Server Error",
      status: 500 as const,
    },
    status: 500 as const,
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
