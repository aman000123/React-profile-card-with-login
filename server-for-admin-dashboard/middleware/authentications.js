


const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {

    const { authorization } = req.headers;

    if (authorization) {

        //check that token is right or not
        try {

            const decode = jwt.verify(authorization, 'jgjfhdhdgg')

            // console.log(decod)

            req.userContext = { ...decode }
            next()

        } catch (error) {

            res.status(401).send({ error: "invalids token" })
        }
    }
    else {
        res.status(401).send({ error: "your token is missing please takes your taken" })
    }




}


// const { verifyToken } = require('../security/jwt');

// const UnAuthorise = require('../middleware/authorizations')

// const authentication = (req, res, next) => {

//     // header se token ko nikal le


//     try {

//         const { authorization } = req.headers
//         if (authorization) {

//             const [, token] = authorization.split(" ");

//             const payload = verifyToken(token)

//             req.userContext = payload;

//             console.log("token is", token)
//             next()


//         } else {
//             next(new UnAuthorise("Authorization token in missing in request header."));
//         }
//     }

//     catch (error) {
//         next(new UnAuthorise("Your Tokens is invalid"))
//     }
// }

// module.exports = {
//     authentication
// } 