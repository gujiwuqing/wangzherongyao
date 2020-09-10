module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const assert = require('http-assert')
    const User = require('../model/user')
    const jwt = require('jsonwebtoken');
    const secret = require('../utils/config')
    const verifyToken = require('../utils/verifyToken')
    router.post('/register', async (req, res) => {
        const {
            username,
            password,
            email
        } = req.body
        const userEmail = await User.findOne({
            email
        })
        const user = await User.findOne({
            username
        })
        try {
            assert(username != '' || password != '' || email != '', 401, '参数不得为空')
            assert(!userEmail, 401, '邮箱已存在')
            assert(!user, 401, '用户已存在')
            User.create(req.body)
            res.send({
                status: 200,
                msg: '注册成功'
            })
        } catch (err) {
            res.send({
                status: err.status,
                msg: err.message
            })
        }
    })

    router.post('/login', async (req, res) => {
        const {
            username,
            password
        } = req.body
        const user = await User.findOne({
            username
        }).populate('role')
        try {
            assert(username != '' || password != '', 401, '参数不得为空')
            assert(user, '401', '账号不存在')
            assert(user.password == password, '401', '密码不正确')
            const token = jwt.sign({
                id: user._id
            }, secret, {
                "algorithm": "HS256",
                expiresIn: 3600 // expires in 24 hours
            });
            res.send({
                status: 200,
                msg: '登录成功',
                token,
                user
            })
        } catch (err) {
            res.send({
                status: err.status,
                msg: err.message
            })
        }
    })
    //个人信息接口
    router.get('/user/info', verifyToken, async (req, res) => {
        console.log(req.query)
        const {id}  = req.query
        const user =  await User.findById({_id:id})
        res.send({
            status: 200,
            msg: '',
            user
        })
        
    })
    router.post('/user/update',verifyToken,async(req,res)=>{
        const {_id} = req.body
        console.log(req.body);
        const user = await User.findByIdAndUpdate({_id},req.body,{new:true})
        res.send({
            status: 200,
            msg: '修改成功',
            user
        })
    })
    router.post('/user/list',verifyToken,async(req,res)=>{
        const pageNo = Number(req.body.pageNo)
        const pageSize = Number(req.body.pageSize)
        const skip = (pageNo - 1) * pageSize
        const model = await User.find().skip(skip).limit(pageSize).populate('role')
        const count = await (await User.find()).length
        console.log(count)
        res.send({
            status: 200,
            msg: '',
            list: model,
            count:count
        })
    })

    router.post('/user/delete',verifyToken,async(req,res)=>{
        const {_id} = req.body
        await User.findByIdAndDelete({_id})
        res.send({
            status: 200,
            msg: '删除成功',
        })
    })

    router.post('/change/password', verifyToken, async (req, res) => {      
        try {
            const {
                oldPassword,
                newPassword,
                checkPassword,
                _id
            } = req.body
            assert(oldPassword != '' || oldPassword != '' || _id != ''||checkPassword!='', 401, '参数不得为空')
            assert(oldPassword!==oldPassword,411,'原密码不能与新密码相同')
            const user = await User.findById({_id})
            assert(user, '401', '旧密码不正确')
            assert(checkPassword===newPassword,411,'密码不一致')
            const updateStr = {password:newPassword}
            const model = await User.findByIdAndUpdate({_id},updateStr,{new:true})
                  res.send({
                      status:200,
                      msg:'修改成功',
                      model
                  })
        } catch (err) {
            res.send({
                status: err.status,
                msg: err.message
            })
        }
    })
    app.use(router)
}