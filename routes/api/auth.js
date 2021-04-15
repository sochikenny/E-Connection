//Bring in express
const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const jwtToken = process.env.JWTSECRET
const bcrypt = require('bcryptjs')

const User = require('../../models/User')

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get('/', auth, async (req, res)=> {
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

//@route    POST api/auth
//@desc     Authenticate user & get token(so you can make requests to private routes)
//@access   Public
router.post('/', 
[ 
    check('email', 'Please include a valid email').isEmail(),
    check('password','Password is required').exists()
], 
async (req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    const { email, password } = req.body
    
    try{
    //See if user exists 
     let user = await User.findOne({ email })
     if (!user) {
        return res.status(400).json({ error: [{ msg: 'Invalid Credentials'}]})
     }

     const isMatch = await bcrypt.compare(password, user.password)

     if(!isMatch){
        return res.status(400).json({ error: [{ msg: 'Invalid Credentials'}]})
     }


    //Return JsonWebtoken (in the front end, if user registers, he/she can be logged in right away with this token)
    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(payload, jwtToken, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err
        res.json({ token })
    });

    } catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }

})


module.exports = router 

//file used to find registered user with already verified token from auth middleware