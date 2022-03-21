const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const config = require('./src/config')
const Routers = require('./src/routers')
const app = express()

const PORT = config.port
const URI = config.DB.uri

app.use(cors())
app.use(cookieParser())
app.use(express.json())

mongoose.connect(URI)
	.then(()=>{
		console.log("Database is connecting !!!")
	})
	.catch((err)=>{
		console.log("err: ",err)
	})

Routers(app)
// app.get("/",(req,res)=>{
// 	res.send('hello world')
// })

app.listen(PORT, ()=>{
	console.log('Server is running: ',PORT)
})