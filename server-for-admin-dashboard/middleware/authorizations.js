

const UnAuthorise = require("../ErrorsHandle/Error")

const authorization = (premission) => {

    return (req, res, next) => {

        const { permissions } = req.userContext;

        console.log("permissions", permissions)


        if (permissions.includes(premission)) {

            next();

        } else {
            next(new UnAuthorise("Access Denied"))
        }

    }
}

module.exports = {
    authorization
} 