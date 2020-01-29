export enum ApiErrorType {
  UserNotConfirmedException = 'UserNotConfirmedException',
  GenericAPIException = 'GenericAPIException'
}
export type ApiError = { message: string; type: ApiErrorType };
export type ApiStatus<T> = { data?: T; success: boolean; error?: ApiError };
