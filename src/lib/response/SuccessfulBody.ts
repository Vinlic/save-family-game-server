import _ from 'lodash';

import Body from './Body.ts';

export default class SuccessfulBody extends Body {
    
    constructor(data, message) {
        super({
            code: 0,
            message: _.defaultTo(message, "OK"),
            data
        });
    }

    static isInstance(value) {
        return value instanceof SuccessfulBody;
    }

}