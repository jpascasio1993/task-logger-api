export type Result<T> = {
  data?: T;
  error: any | null;
  isSuccess: boolean;
};

export const ResultSuccess = <T>(data: T): Result<T> => ({
  data,
  error: null,
  isSuccess: true,
});

export const ResultError = <T>(error: any): Result<T> => ({
  error,
  isSuccess: false,
});
