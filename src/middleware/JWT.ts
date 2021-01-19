import { Request, Response, NextFunction } from 'express';
// import { verify } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';


import authConfig from '../config/authConfig';
import AppError from "../errors/Handler";

export default function JWT(
    request: Request,
    response: Response,
    next: NextFunction
) {
	const authHeader = request.headers.authorization	;

	if (!authHeader) {
		return response.status(401).json({message: 'JWT Token is missing.' });
	}

	const [type, token] = authHeader.split(' ');
	// const token = authHeader.split(' ')[1];

	try {
		// const decodedToken = verify(token, authConfig.jwt.secret);
		 jwt.verify(token, authConfig.jwt.secret)
    

		// console.log(decodedToken);

		return next();
	} catch (error) {
		return response.status(401).json({message: 'Invalid JWT Token.' });
	}
}

