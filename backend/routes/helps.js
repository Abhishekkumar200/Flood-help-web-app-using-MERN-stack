const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Helps = require('../models/Helps');
const { body , validationResult} = require('express-validator');

//ROUTER: 1 to add helps to database.
router.post('/addhelps', fetchuser, [
    body('description', "Description length should be greater than 5.").isLength({min:5}),
    body('address', "Address length should be greater than 5.").isLength({min:5})
], async(req, res)=>{
    try{
        const{description, address} = req.body;
        const errors = validationResult(req);

        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        const help = new Helps({
            user: req.user.id, description, address
        });

        const savedHelp = await help.save();
        res.send(savedHelp);
    }catch (error){
        console.log(error.message);
        res.status(500).send({error: "Something went wrong."});
    }
});

//ROUTER: 2 Fetch helps from database.
router.get('/fetchhelps', fetchuser, async (req, res)=>{
    try {
        if(req.user.role==='user'){
            
            const helps = await Helps.find({user: req.user.id});
            res.send(helps);
        }
        else
        {
            const helps = await Helps.find();
            res.send(helps);
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: "Something went wrong."});
    }
});

//ROUTER: 3 update helps by users.
router.put('/updatehelp/user/:id', fetchuser, async (req, res)=>{

    try {
        
        const {description, address} = req.body;
        const newHelp = {};
        if(description){newHelp.description = description};
        if(address){newHelp.address = address};
        
        //Find the note to be updated.
        let help = await Helps.findById(req.params.id);
        if(!help){return res.status(404).send({error: "Not found."})};
        
        if(help.user.toString() !== req.user.id)
        {
            return res.status(401).send({error: "Not allowed."})
        }
        
        help = await Helps.findByIdAndUpdate(req.params.id, {$set: newHelp}, {new:true});
        res.json(help);

    } catch (error) {
        res.send({error: "Something went wrong."});
    }

});

//ROUTER: 4 delete helps by user.
router.delete('/deletehelp/user/:id', fetchuser, async (req, res)=>{
    //Find the help to be deleted.
    let help = await Helps.findById(req.params.id);
    if(!help){return res.status(404).send({error: "Not found."})};

    // Allow user only if he has written the note.
    if(help.user.toString() !== req.user.id)
    {
        return res.status(401).send({error: "Not allowed."})
    }

    help = await Helps.findByIdAndDelete(req.params.id);
    res.json({Success: "Note deleted Successfully.", note: help});
});

//ROUTER: 5 verifying helps by panchayat.
router.put('/verifyhelp/panchayat/:id', fetchuser, async (req, res)=>{

    try {
        
        const {status, price} = req.body;
        const newHelp = {};
        if(status){newHelp.status = status};
        if(price){newHelp.price = price};
        
        //Find the note to be updated.
        let help = await Helps.findById(req.params.id);
        if(!help){return res.status(404).send({error: "Not found."})};
        
        // if(help.user.toString() !== req.user.id)
        // {
        //     return res.status(401).send({error: "Not allowed."})
        // }
        
        help = await Helps.findByIdAndUpdate(req.params.id, {$set: newHelp}, {new:true});
        res.json(help);

    } catch (error) {
        res.send({error: "Something went wrong."});
    }

});

module.exports = router;