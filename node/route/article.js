module.exports = (app)=>{
   const express = require('express');
   const router = express.Router()
   const verifyToken = require('../utils/verifyToken')
   const assert = require('http-assert')
   const Article = require('../model/article');
   router.post('/article/add',verifyToken,async(req,res)=>{
      console.log( req.body)
      const {name,icon}  = req.body
      const model = await Article.findOne({
        name
    })
    try {
        assert(name != ''&&icon!='', '401', '名称不得为空')
        assert(!model, '401', '该物品已存在')
        Article.create(req.body)
        res.send({
            status: 200,
            msg: '创建成功'
        })
    } catch (err) {
        res.send({
            status: err.status,
            msg: err.message
        })
    }
   })


   router.post('/article/list',verifyToken,async(req,res)=>{
    const pageNo = Number(req.body.pageNo)
    const pageSize = Number(req.body.pageSize)
    const skip = (pageNo - 1) * pageSize
    try {
        assert(pageNo != '' || pageSize != '', '401', '参数不得为空')
        const list1 = await Article.find()
        const count = list1.length
        const list = await Article.find().skip(skip).limit(pageSize)
        res.send({
            status: 200,
            msg: '',
            list: list,
            count: count
        })
    } catch (err) {
        res.send({
            status: err.status,
            msg: err.message
        })
    }
   })

   router.get('/article/info',verifyToken,async(req,res)=>{
    const {id} = req.query
    const model = await Article.findById({_id:id})
    res.send({
        status: 200,
        msg: '',
        model:model
    })
})

router.post('/article/update',verifyToken,async(req,res)=>{
    const {_id} = req.body
    const model =  await Article.findByIdAndUpdate({_id},req.body)
    res.send({
        status: 200,
        msg: '更新成功',
    })
})

   router.post('/article/delete', verifyToken, async (req, res) => {
    const {
        id
    } = req.body
    await Article.findByIdAndDelete(id, req.body)
    res.send({
        status: 200,
        msg: '删除成功',
    })
})

   app.use(router)
}