
const express = require('express');
const router = express.Router();
const UnAuthorise = require('../ErrorsHandle/Error')
const { createUsersSceema } = require('../backendvalidation/userschema')
const { getUsers, saveUsers, updateProfiles, getIndividualsProfiles } = require('../database/signin');
const multer = require('multer');
const fs = require('fs');
const path = require('path')

router.get('/', async (req, res, next) => {
    try {
        const allUser = await getUsers();
        console.log("get All user", allUser)
        return res.send(allUser)
    }
    catch (error) {
        next(new UnAuthorise("you have not data"));
    }
})



// Set up multer for handling file uploads

// Configure Multer storage
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});


const upload = multer({ storage });
router.post('/', upload.single('file'), async (req, res, next) => {

    const { fname, lname, email, phone, password, country, address, gender } = req.body;
    const file = req.file
    const data = { file, fname, lname, email, phone, password, country, address, gender }
    const { error } = createUsersSceema.validate(data)

    if (error) {
        console.error('Validation error: ', error);
        next(new UnAuthorise("Input fields are not valids"))
        // return res.status(400).send({ error: error.message })
    } else {
        //const files = file.path;
        const files = file.filename;
        const data = { files, fname, lname, email, phone, password, country, address, gender }

        const saveData = await saveUsers(data);
        console.log("savedata", saveData)
        return res.send({ message: "Users Saved" });
    }

})


//get one profiles

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const oneproducts = await getIndividualsProfiles(id);
    if (oneproducts.length > 0) {
        return res.send(oneproducts[0]);
    }
    console.log("onprofile", oneproducts)

    return res.send({})


})



router.put('/:id', upload.single('file'), async (req, res, next) => {

    try {
        // const { id } = req.params;
        const file = req.file
        const files = file.filename;
        const { id, fname, lname, email, phone } = req.body;
        const result = await updateProfiles(id, files, fname, lname, email, phone);
        console.log("database updates", result)
        return res.send(result)


    } catch (err) {
        next(err)
        console.log("error in updates")
        //  res.send(err)
    }
})





module.exports = router;