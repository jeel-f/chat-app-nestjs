import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let error: IError = {};
    switch (exception.code) {
      case 11000:
        error = {
          statusCode: HttpStatus.NOT_FOUND,
          error: exception.errmsg,
          message: exception.name
        }
        break;
      default:
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "Internal Error"
        }
        break;
    }
    response.status(error.statusCode).json(error);
  }
}
interface IError {
  message?,
  statusCode?
  error?
}