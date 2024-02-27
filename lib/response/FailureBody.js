import _ from 'lodash';

import Body from './Body.js';
import Exception from '../exceptions/Exception.js';
import APIException from '../exceptions/APIException.js';
import EX from '../exceptions.js';
import HTTP_STATUS_CODES from '../http-status-codes.js';

export default class FailureBody extends Body {
    
    constructor(error, _data) {
        let errcode, errmsg, data = _data, httpStatusCode = HTTP_STATUS_CODES.OK;;
        if(_.isString(error))
            error = new Exception(EX.SYSTEM_ERROR, error);
        else if(error instanceof APIException || error instanceof Exception)
            ({ errcode, errmsg, data, httpStatusCode } = error);
        else if(_.isError(error))
            error = new Exception(EX.SYSTEM_ERROR, error.message, error.stack);
        super({
            code: errcode || -1,
            message: errmsg || 'Internal error',
            data,
            statusCode: httpStatusCode
        });
    }

    static isInstance(value) {
        return value instanceof FailureBody;
    }

}