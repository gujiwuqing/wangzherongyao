module.exports = app=>{
    const express = require('express')
    const router = express.Router()
    const assert = require('http-assert')
    const User = require('../model/user')
    const jwt = require('jsonwebtoken');
    const secret = require('../utils/config')
    const verifyToken = require('../utils/verifyToken')
    router.post('/register',async (req,res)=>{
       const {username,password,email} = req.body
       const userEmail =  await User.findOne({email})
        console.log(userEmail);
        const user = await User.findOne({username})
        try {
            assert(username!=''&&password!=''&&email!='',401,'参数不得为空')
            assert (!userEmail,401,'邮箱已存在')
            assert (!user,401,'用户已存在')
            User.create(req.body)
            res.send({
                status:200,
                msg:'注册成功'
            })
        }catch (err) {
            res.send({
                status:err.status,
                msg:err.message
            })
        }
    })

    router.post('/login',async (req,res)=>{
        console.log(req.body);
        const {username,password}  = req.body
        const user = await User.findOne({username})
        try {
            assert(username!=''&&password!='',401,'参数不得为空')
            assert(user,'401','账号不存在')
            assert(user.password==password,'401','密码不正确')
            const token = jwt.sign({
                id: user._id
            }, secret, {
                "algorithm": "HS256",
                expiresIn: 3600 // expires in 24 hours
            });
            res.send({ status: 200, msg: '登录成功', token: token })
        }catch(err){
           res.send({
               status:err.status,
               msg:err.message
           })
        }
    })
//个人信息接口
    router.get('/user',verifyToken,async (req,res)=>{
        console.log(req.query)
    })
    app.use(router)
}