
const { getConnection } = require('./connection');

const bcrypt = require('bcrypt');


const getUsers = async () => {
    const query = `SELECT * FROM serverside`;
    const connection = await getConnection();
    const [rows] = await connection.execute(query);
    // console.log("get rows", rows)
    return rows
}



const saveUsers = async (user) => {
    const pass = bcrypt.hashSync(user.password, 10);
    const query = `INSERT INTO serverside(file,fname,lname,email,phone,password,country,address,gender) 
    VALUES ('${user.files}','${user.fname}','${user.lname}','${user.email}','${user.phone}','${pass}','${user.country}','${user.address}','${user.gender}')`;
    console.log("insert query", query)
    const connection = await getConnection();
    const [rows] = await connection.execute(query);
    //  console.log("rows==", rows)
    return rows;
}


const savePassword = async (users) => {

    // const pass1 = bcrypt.hashSync(users.password, 10);

    const query1 = `INSERT INTO serverside(password) VALUES ('${users.pass1}')`;
    const connection = await getConnection();
    const [rows] = await connection.execute(query1);
    // console.log("rows for resetpassword ==", rows)
    return rows;


}



//for emails existing query
const emailExist = async (email) => {
    const query1 = `SELECT * FROM serverside WHERE email= '${email}'`;
    console.log("database query for emails existings", query1);
    const connection = await getConnection();
    const [rows] = await connection.execute(query1);
    // console.log("rows from database for email", rows)
    return rows;

}




//for logins  users

const userLoginDetails = async (email) => {

    const query = `SELECT id, email, password ,fname, lname,country,phone FROM serverside 
    WHERE email = '${email}'`;
    console.log("database query", query);
    const connection = await getConnection();

    const [rows] = await connection.execute(query);
    // console.log("rows from database", rows)
    return rows;


    //return res
}



//for updating
const updateProfiles = async (id, files, fname, lname, email, phone) => {
    const query = `UPDATE serverside SET file = '${files}',fname = '${fname}',lname ='${lname}', 
    email='${email}', phone= '${phone}'  WHERE id=${id}`;
    console.log("updated query", query);
    const connection = await getConnection()
    const result = await connection.execute(query);
    return result;
}



//get individuals profiles

const getIndividualsProfiles = async (id) => {
    const query = `SELECT * FROM serverside WHERE id=${id}`;
    const connection = await getConnection();
    const [rows] = await connection.execute(query);
    console.log("rows by id", rows)
    return rows
}

//reset password 

const saveResetPassword = async (data) => {

    const { newPassword, email } = data

    const pass = bcrypt.hashSync(newPassword, 10)

    const query = `UPDATE serverside SET password = '${pass}' WHERE email = '${email}'`;
    console.log("reset query", query)
    const connection = await getConnection();
    const result = await connection.execute(query);
    // console.log("result by  update and reset password", result)
    return result

}



module.exports = {
    getUsers,
    saveUsers,
    userLoginDetails,
    savePassword,
    emailExist,
    updateProfiles,
    getIndividualsProfiles,
    saveResetPassword
}