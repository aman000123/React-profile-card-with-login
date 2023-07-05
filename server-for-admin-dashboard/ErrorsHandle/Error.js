
class UnAuthorise extends Error {


    constructor(message, statuscode) {

        super(message)
        this.statusCode = 401;
        this.message = message || "Unauthorise"

        this.name = 'validation error'
    }

}

module.exports = UnAuthorise;