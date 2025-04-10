export interface Failure {
    message: string;
    statusCode: number;
    details: String,
    error: Error,
}