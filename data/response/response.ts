 export type Response<T> = {
    title?: string;
    message?: string;
    type: 'success' | 'error';
    data?: T;
    error?: Error;
}


export const ResponseSuccess = <T>({title, message, data}:{title?: string, message?: string, data?: T}): Response<T> => ({
    data: data,
    type: 'success',
    title: title,
    message: message,
});

export const ResponseError = <T>({title, message, error}:{title?: string, message?: string, error: Error}): Response<T> => ({
    error: error,
    type: 'error',
    title: title,
    message: message,
});