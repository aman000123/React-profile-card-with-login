

const jwt = require('jsonwebtoken');

const SECRET = "anskkdkhfssakjhguqrwuuhuhwqr";

const generateToken = (payload) => {

    const token = jwt.sign(payload, SECRET);

    return token;

}

//now verify tokens
const verifyToken = (token) => {
    return jwt.verify(token, SECRET)
}

module.exports = {
    generateToken,
    verifyToken
}