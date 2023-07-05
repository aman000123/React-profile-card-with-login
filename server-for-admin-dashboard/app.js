const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const usersRouter = require('./routes/users');

const authRoutes = require('./routes/userLogin')

const authmiddleware = require('./middleware/authentications');

const mail = require('./routes/sendEmail')

const sendEmail = require('./routes/sendEmail')
const app = express();
const cors = require('cors')


console.log("application has been started on port 4000");


app.use(cors())
app.use(logger('dev'));
//app.use(express.json());
// Increase the maximum request size limit
app.use(express.json({ limit: '50mb' })); // Adjust the limit as per your needs

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static('uploads'));


// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/login', authRoutes);

app.use('/sendEmails', require('./routes/sendEmail'))

app.use('/users', require('./routes/userSignin'))

app.use('/reset', require('./routes/userResetPassword'))



// app.use('/', indexRouter);
// app.use('/users', usersRouter);



const errorHandeler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    const message = err.message || "Internal erver Error";

    res.status(statusCode).send({ errorMessage: message })
}

app.use(errorHandeler);

module.exports = app;
