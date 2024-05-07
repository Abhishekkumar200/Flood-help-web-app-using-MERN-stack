const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const fetchuser = require("../middleware/fetchuser");

const key = 'Abhishek'

//ROUTE-1: User registration.
router.post('/register', [
    body("name","Enter a valid name.").isLength({min:3}),
    body("email","Enter a valid email.").isEmail(),
    body("password","Enter a valid password.").isLength({min:5}),
    body("role","Enter a valid role.").isLength({min:3})
], async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    // console.log(errors);
    if(!errors.isEmpty())
    {
        return res.status(400).json({success, error: "Invalid Credentials."});
    }
    
    try {
        
        let user = await User.findOne({email: req.body.email});

        if(user)
        {
            return res.status(400).json({success, error: `User with the email id '${req.body.email}' already exist.`});
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            role: req.body.role
        });
        // console.log(user);

        const data = {
            user:{
                id: user._id,
                role: user.role
            }
        };
        const role = req.body.role;
        const authtoken = jwt.sign(data, key);
        success = true;
        res.json({success, authtoken, role});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({success, error: "Problem in user registration."});
    }

});

//ROUTE: 2 for user login.
router.post("/login", [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Enter a valid password.").exists(),
    // body("role", "Select a valid role.").isLength({min:3})
], async(req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({success, error: "Invalid credentials."});
    }

    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});
        console.log(user);
        if(!user)
        {
            return res.status(400).json({success, error: "Login with correct credentials."});
        }

        //Comparing password and Hash value.
        const passComp = await bcrypt.compare(password, user.password);

        if(!passComp)
        {
            return res.status(400).json({success, error: "Login with correct credentials."});
        }
        const role = user.role;
        const data = {
            user:{
                id: user._id,
                role: user.role
            }
        }

        success = true;
        const authtoken = jwt.sign(data, key);
        res.json({success, authtoken, role});

    } catch (error){
        console.log(error.message);
        res.status(500).send({success, error: "Something went wrong."});
    }

});

//ROUTER: 3 fetching user details.

router.post('/getuser', fetchuser,async (req, res)=>{

    try{
        const userId = req.user.id;
        // console.log(userId);
        // console.log(req.user.role);
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: "Something went wrong."});
    }
});

module.exports = router;