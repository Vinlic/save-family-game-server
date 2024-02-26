import _ from 'lodash';

import Body from './Body.js';
import Exception from '../exceptions/Exception.js';
import APIException from '../exceptions/APIException.js';
import EX from '../exceptions.js';

export default class FailureBody extends Body {
    
    constructor(error, data) {
        let errcode, errmsg;
        if(_.isString(error))
            error = new Exception(EX.SYSTEM_ERROR, error);
        else if(_.isError(error))
            error = new Exception(EX.SYSTEM_ERROR, error.message, error.stack);
        else
            ({ errcode, errmsg } = error);
        super({
            code: errcode || -1,
            message: errmsg || 'Internal error',
            data,
            statusCode: error.httpStatusCode
        });
    }

    static isInstance(value) {
        return value instanceof FailureBody;
    }

}