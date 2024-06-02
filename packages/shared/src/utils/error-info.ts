import { STATUS_CODES } from "../constants";

const getErrorStatusCode = (error: object, defaultErrorCode: number) => {
  if ("getStatus" in error && error.getStatus instanceof Function) {
    return Number(error.getStatus());
  } else if ("code" in error) {
    return Number(error.code);
  } else if ("statusCode" in error) {
    return Number(error.statusCode);
  }

  return defaultErrorCode;
};

const getErrorMessage = (error: object, status: number) => {
  return "message" in error && typeof error.message === "string"
    ? error.message
    : "Server error with status " + status;
};

const getErrorName = (error: object) => {
  return "name" in error && typeof error.name === "string" ? error.name : "Unknown error";
};

const getErrorStack = (error: unknown) => {
  return typeof error === "object" && !Array.isArray(error) && error !== null && "stack" in error
    ? error.stack
    : "";
};

export const getErrorInfo = (error: unknown) => {
  if (typeof error !== "object" || Array.isArray(error) || error === null)
    return {
      message: `Server error with status ${STATUS_CODES.SERVER_ERROR}`,
      name: "Unknown error",
      stack: "",
      statusCode: STATUS_CODES.SERVER_ERROR,
    };

  const statusCode = getErrorStatusCode(error, STATUS_CODES.SERVER_ERROR);
  return {
    message: getErrorMessage(error, statusCode),
    name: getErrorName(error),
    stack: getErrorStack(error),
    statusCode,
  };
};
