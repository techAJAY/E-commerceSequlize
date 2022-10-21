const express = require('express')
const app = express()
const sequelize = require('sequelize')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2');
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const orderRouter = require('./routes/order')
const cartRouter = require('./routes/cart')
const  fileUpload   = require( 'express-fileupload')

//config dot env
const dotenv =  require('dotenv').config()

//require port
const port = process.env.PORT 

//require index file
require('./models/index')



//bodyParse
app.use(bodyParser.json())


app.use(fileUpload({
    useTempFiles:true
}))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use('/test',async (req,res)=>{
    res.send("home page")
})



//Routes
app.use(userRouter)

app.use(productRouter)

app.use(cartRouter)

app.use(orderRouter)








app.listen(port,()=>{
    console.log(`port is running on http://localhost:${port}`);
})