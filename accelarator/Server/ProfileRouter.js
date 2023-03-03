const express = require('express');
const Profile = require('./ProfileModel.js')
const profileRouter = express.Router();
profileRouter.use(express.json());


profileRouter.post('/createprofile',async (req,res)=>{
     
    let profile = new Profile();
    
    profile.name = req.body.name;
    profile.role = req.body.role;
    
    
    const doc = await profile.save();

    console.log(doc);
    res.json(doc);
})

profileRouter.get('/getprofile',async (req,res)=>{
    let profile = new Profile();
    const docs = await profile.find({});
    res.json(docs)
})

module.exports = profileRouter;