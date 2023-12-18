// export type SuccessResponseArguments<T extends Record<string, unknown>> = {
//   data?: T;
//   message?: string;
//   status?: number;
// };

// export const successResponse = <T extends Record<string, unknown>>({
//   data,
//   message,
//   status,
// }: SuccessResponseArguments<T>) => {
//   return {
//     body: {
//       data: data ?? {},
//       message: message ?? "Successful request",
//     },
//     status: status ?? (200 as const),
//   };
// };

// //

// export type ErrorResponseArguments<T extends Record<string, unknown>> = {
//   error?: T;
//   message?: string;
//   status?: number;
// };

// export const errorResponse = <T extends Record<string, unknown>>({
//   error,
//   message,
//   status,
// }: ErrorResponseArguments<T>) => {
//   return {
//     body: {
//       error: error ?? {},
//       message: message ?? "Server error with status " + (status ?? 500),
//     },
//     status: status ?? (500 as const),
//   };
// };

// //////

export type ResponseArguments<T extends Record<string, unknown>> = {
  message?: string;
  status: number;
} & ({ data: T } | { error: T });

// export type Response<T extends Record<string, unknown>> = {
//   body: {
//     message: string;
//   } & ({ data: T } | { error: T });
//   status: ObjectValues<typeof StatusCodes>;
// };

export const formatBody = <T extends Record<string, unknown>>({
  message,
  status,
  ...response
}: ResponseArguments<T>) => {
  if ("error" in response) {
    return {
      error: response.error,
      message: message ?? "Server error with status " + status,
    };
  }

  return {
    data: response.data,
    message: message ?? "Server error with status " + status,
  };
};

export const wrapper = (cb: typeof Function) => {
  try {
          const a = 3
    cb();
  } catch (error) {
    return {
      body: {
        error,
        message: error.message ?? "Server error with status " + status,
      },
      status: 500,
    };
  }
};
