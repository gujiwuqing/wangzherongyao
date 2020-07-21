const jwt = require('jsonwebtoken')
const secret = require('../utils/config')
function verifyToken(req, res, next) {
    const token =  req.headers.authorization
    if (!token)
        return res.status(403).send({  msg: 'token不存在' });
    // console.log(token)
    jwt.verify(token,secret, (err, decoded) =>{
        if (err)
            return res.status(402).send({ msg:'token无效' });
        next();
    });
}
module.exports = verifyToken