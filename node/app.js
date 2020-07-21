const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false })) // parse application/json app.use(bodyParser.json())
app.use(bodyParser.json())

require('./utils/mongoose')(app)
require('./route/user')(app)
require('./route/category')(app)
app.listen(3000,(req,res)=>{
    console.log('服务器启动了');
})