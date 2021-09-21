const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER


router.post("/register", async (req, res)=> {

    const salt = await bcrypt.genSalt(10);

    let {username, password, email} = req.body;
    
    let hashpassword = await bcrypt.hash(password, salt);

    const newUser = new User ({
        username: username,
        password: hashpassword ,
        email: email,
        isAdmin: false, 
    });

    try {
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);        
    } catch (error) {
        res.status(500).json(error);

    }

});


// LOGIN

router.post("/login", async (req, res)=> {

    const salt = await bcrypt.genSalt(10);

    let {username, password } = req.body;
    
    try {
        const findUser = await User.findOne(
            {username: username}
        );
        !findUser && res.status(401).json("Invalid User Credentials")
        verifiedPassword = await bcrypt.compare(password, findUser.password)

        !verifiedPassword && res.status(400).json("Invalid Username or Password")
        const token = jwt.sign({ id: findUser.id, isAdmin: findUser.isAdmin}, process.env.TOKEN_SECRET, {expiresIn: "5d"});
        
        res.status(201).json({token, findUser})


    } catch (error) {
        res.status(500).json(error);

    }

});

module.exports = router