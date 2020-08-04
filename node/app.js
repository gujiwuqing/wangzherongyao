const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false })) // parse application/json app.use(bodyParser.json())
app.use(bodyParser.json())

require('./utils/mongoose')(app)
require('./route/user')(app)
require('./route/category')(app)
require('./route/article')(app)
app.use('/uploads', express.static(__dirname + '/uploads'))
app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://127.0.0.1:3000/uploads/${file.filename}`
    res.send(file)
  })
  
app.listen(3000,(req,res)=>{
    console.log('服务器启动了');
})