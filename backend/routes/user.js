const express = require("express");
const router = express.Router();
const User = require("../models/user");

const auth= require('../middleware/auth')

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.post("/users/login",async(req,res)=>{
  try {
    const user=await User.findByCredentials(req.body.email,req.body.password)
    
    const token=await user.generateAuthToken()

    res.status(200).send({user,token})
  } catch (error) {
    res.status(401).send()
  }
})


router.post("/users/logout",auth,async(req,res)=>{
  try {
    req.user.tokens=req.user.tokens.filter((token) => {
      return token.token!==req.token
    })

   

    await req.user.save()
    res.send()

  } catch (error) {
    res.status(500).send()
  }
})

router.get("/users",auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users/me",auth, async (req, res) => {
  try {
    const _id = req.user._id;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User Not Found ");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/update/me",auth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body,{
        new:true
    });
    if (!updatedUser){
        return res.status(404).send();
    } 
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error)
  }
});


router.delete("/delete/me",auth,async(req,res)=>{
    try {
        const deletedUser=await User.findByIdAndDelete(req.user._id)
    if(!deletedUser){
        return res.status(404).send();
    }
    res.status(200).send(deletedUser);
    } catch (error) {
        res.status(400).send(error)
    }


})

module.exports = router;
