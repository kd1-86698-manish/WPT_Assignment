//mysql2 -> module_name 
const mysql = require('mysql2')
//connection between application and database
const pool = mysql.createPool({
    //connection string which is required to connect database(host,user,password,port,database,connectionLimt,etc)
    host: 'localhost',
    user: 'KD1-86698-manish',
    password: 'manager',
    port: 3306,
    database: 'airbnb_db',
    connectionLimit: 10

})
module.exports = {
    pool,
}