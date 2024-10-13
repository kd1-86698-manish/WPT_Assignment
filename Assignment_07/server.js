const express = require('express')
const cors = require('cors')
const utils = require('./utils')
const user = require('./routes/user');

const app = express();
// app.use(cors())
app.use(express.json())

app.use((request, response, next) => {

    if (
        request.url === '/user/login' ||
        request.url ==='/user/register' ||
        
        request.url ==='/category'||
        request.url.startsWith('/bookings')||
        request.url==='/property'||
        request.url.startsWith('/property')||
        request.url.startsWith('/user/profile')
        
        // request.url.startsWith('/image/')
    ) {
        next();
    }
    else {
        console.log("Success")
    }
})

const userRouter=require('./routes/user')
const categoryRouter = require('./routes/category')
const bookingRouter =require('./routes/bookings')
const property =require('./property')

app.use('/user',userRouter)
app.use('/category',categoryRouter)
app.use('/bookings',bookingRouter)
app.use('/property',property)


app.listen(9999, () => { console.log("Server started on port 9999") }) 