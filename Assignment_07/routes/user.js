
const express = require('express'); //imported express
const db = require('../db'); //used db.js for connectivity with database
const utils = require('../utils');//used utils.js for after process user request for sending response
const jwt=require('jsonwebtoken')
const config=require('../config');

//to track user
var router = express.Router(); //created obj of Router()

//put  update the data
router.put('/profile/:userId',(request,response)=>{
    const {firstName, lastName,phone}=request.body
    const statement=`update user set firstName =?,lastName=?,phoneNumber=? where id=?`

    db.pool.execute(
        statement,
        [firstName,lastName,phone,request.params.userId],
        (error,result)=>{
            response.send(utils.createResult(error,result))
        }
    )
})
//get by id
router.get('/profile/:userId',(request,response)=>{
    const statement = `select firstName,lastName,phoneNumber,email from user where id = ?`
    db.pool.execute(
        statement,
        [request.params.userId],
        (error,result)=>{
            response.send(utils.createResult(error,result))    
    })
})

//POST Register
router.post('/register', (request, response) => {
    const { firstName, lastName, email, password, phone } = request.body;
    const statement = `insert into user (firstName,lastName,email,password,phoneNumber)values(?,?,?,?,?);`
    //const encryptedPassword =String(crypto.SHA256(password))
    db.pool.execute(statement, [firstName, lastName, email, password, phone],
        (error, result) => { response.send(utils.createResult(error, result)) })
});

//POST Login
//post route
//Every route has 2 paths(request and response)
router.post('/login',(request,response)=>{
    const{email,password}=request.body
    const statement = `select id,firstName,lastName ,phonenumber,isDeleted from user where email=? and password = ?`
    //const encryptedPassword = String(crypto.SHA256(password))
    //db.pool.query(statement,[email,encryptPassword],(error ,users))
    db.pool.query(statement,[email,password],(error,users)=>{
        if(error)
        {
            response.send(utils.createErrorResult(error))
        } else{
            if(users.length == 0)
            {
                response.send(utils.createErrorResult("user does not exit"))
            } else {
                const user = users[0]
                if( user.isDeleted)
                {
                    response.send(utils.createErrorResult('Your account is closed'))
                }else{
                 //create playload
                 const payload = { id: user.id}
                 const token = jwt.sign(payload,config.secret)
                 const userData = {
                    token,
                    name : `${user['firstName']} ${user['lastName']}`,
                 }  
                 response.send(utils.createSuccessResult(userData))     
                }
            }
        }
    })

})





module.exports = router;