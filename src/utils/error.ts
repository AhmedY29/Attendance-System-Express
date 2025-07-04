export class AppError extends Error {
  statusCode: number;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

   if (Error.captureStackTrace) {
  Error.captureStackTrace(this, this.constructor);
}
  }
} 