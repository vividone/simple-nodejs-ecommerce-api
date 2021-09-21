const router = require('express').Router();
const {accountAuthorization, adminAuthorization} = require('./verifytoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');


router.put("/:id", accountAuthorization, async (req, res) => {

    //let {data, password} = req.body;
    const salt = await bcrypt.genSalt(10);


    // Update User Password
    if(req.body.password){
         req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
          res.status(200).json(updateUser)
        
    } catch (error) {
         res.status(500).json(error);
    }
    
});

//Delete a User account 
router.delete("/:id", accountAuthorization, async (req, rec) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User account deleted')
    } catch (error) {
         res.status(500).json(error)
    }
});

// All Users 

router.get("/", adminAuthorization, async (req, res) => {

    //Get all users
    /*
    Using a specific query match
    const query = req.query.new // new is the query item
    const users = query  
        ? await User.find().sort({ _id: -1 }).limit(1) // finds all and sort all users , with a limit of results
        : await User.find(); // or return all users


    */
    try {
        const users = await User.find();
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error)
    }
});

// Get single user
router.get("/find/:id", adminAuthorization, async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
});
module.exports = router