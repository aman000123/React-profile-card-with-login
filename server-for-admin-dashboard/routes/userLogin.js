
const express = require('express');
const router = express.Router();
const UnAuthorise = require('../ErrorsHandle/Error')
const { createUsersSceema } = require('../backendvalidation/userschema')
const jwt = require('../security/jwt')
const { userLoginDetails } = require('../database/signin');
const bcrypt = require('bcrypt');




router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userLoginDetails(email, password);

    console.log("user password", user)

    if (!email) {

        res.send(new UnAuthorise("user emails is missing"));

    }
    if (!password) {

        res.send(new UnAuthorise("password is missing"));

    }

    if (user.length > 0) {
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        console.log("user[0].password", user[0].password)

        console.log("bcrypt password", isPasswordValid);

        if (isPasswordValid) {
            const { id, fname, lname, email, phone, country } = user[0];
            const token = jwt.generateToken({ id, email });
            console.log("tokens are", token)
            res.send({ token, fname, lname, email, phone, country, id });
        } else {
            next(new UnAuthorise("Password is invalid."))
        }

    } else {
        next(new UnAuthorise("User Emails is invalid."))
    }

});


module.exports = router;