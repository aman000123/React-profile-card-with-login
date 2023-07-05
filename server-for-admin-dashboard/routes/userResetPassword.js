

const express = require('express');
const router = express.Router();
const UnAuthorise = require('../ErrorsHandle/Error')
const bcrypt = require('bcrypt');
const { getConnection } = require('../database/connection')
const { saveResetPassword } = require('../database/signin');
const { emailExist } = require('../database/signin');


router.post('/', async (req, res, next) => {
    const data = req.body;

    console.log(data.email, data.newPassword, "testing")

    const userEmail = await emailExist(data.email)
    //console.log("useremails", userEmail)

    // console.log("length", userEmail.length)

    if (userEmail.length > 0) {


        const userPassword = await saveResetPassword(data)

        // console.log("user password length", userPassword.length)

        if (userPassword.length == 2) {
            res.status(200).send({ message: "Password reset successfully" });
            // console.log("email  exist in db")

        }

    }
    else {

        res.status(401).send({ message: "Email is not exist" })
        //  console.log("email not exist in db")
    }


})

module.exports = router;