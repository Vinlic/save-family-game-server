import _ from 'lodash';

import Body from './Body.js';

export default class FailureBody extends Body {
    
    constructor(error, data) {
        if(_.isString(error)) error = new Error(error);
        super({
            code: _.isFinite(error._code) ? error._code : -1,
            message: error.message,
            data,
            statusCode: error.httpStatusCode
        });
    }

    static isInstance(value) {
        return value instanceof FailureBody;
    }

}