import Body from './Body.js';;

export default class SuccessfulBody extends Body {
    
    constructor(data, message) {
        super({ code: 0, message: message || "OK", data });
    }

    static isInstance(value) {
        return value instanceof SuccessfulBody;
    }

}