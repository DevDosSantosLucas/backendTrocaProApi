import { ErrorRequestHandler, Request, Response } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error:ErrorRequestHandler, request:Request, response: Response, next) => {
  //Se o erro for da instancia da classe ValidationError
  if (error instanceof ValidationError){
    let errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({message: 'Validations fails', errors});
  }
  console.error(error);

  return response.status(500).json({message: 'Internal Server Error'});
}

export default errorHandler;