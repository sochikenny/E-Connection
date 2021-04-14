const jwt = require('jsonwebtoken')
const jwtToken = process.env.JWTSECRET

module.exports = function(req, res, next){
    //Get token from header
    const token = req.header('x-auth-token')

    //Check if no token
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied'})
    }

    //verify token
    try{
        const decoded = jwt.verify(token, jwtToken)

        req.user = decoded.user
        next()
    }catch(err){
        res.status(401).json({ msg: 'Token is not valid'})
    }
}

//middleware for getting token, decoding it and letting user go through the protected routes