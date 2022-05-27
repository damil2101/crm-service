import { Response } from 'express';
import { status_codes } from '../../models/common/status-codes';

export function successResponse(message: string, DATA: any, res: Response) {
    res.status(status_codes.success).json({
        STATUS: 'SUCCESS',
        MESSAGE: message,
        DATA
    });
}

export function failureResponse(message: string, DATA: any, res: Response) {
    res.status(status_codes.success).json({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA
    });
}

export function insufficientParameters(res: Response) {
    res.status(status_codes.bad_request).json({
        STATUS: 'FAILURE',
        MESSAGE: 'Insufficient parameters',
        DATA: {}
    });
}

export function dbError(err: any, res: Response) {
    console.log(err);

    if(err._message === 'user validation failed'){
        res.status(status_codes.conflict).json({
            STATUS: 'FAILURE',
            MESSAGE: 'MongoDB error: Unique constraint violation. A user with the same key exists',
            DATA: err
        });
    }
    res.status(status_codes.internal_server_error).json({
        STATUS: 'FAILURE',
        MESSAGE: 'MongoDB error',
        DATA: err
    });
}