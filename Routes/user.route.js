const express = require("express");
const { userModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");


const userRoute = express.Router();

userRoute.post("/signup", async(req,res) => {
    try{
      const {email,password} = req.body;
      const existingUser = await userModel.findOne({email});
      if(existingUser){
        res.status(400).json({msg: "User already exists, Please Login!!"});
      }else{
        bcrypt.hash(password, 5, async(err, hash) => {
            if(err){
                res.status(400).json({msg: "Something went wrong", err});
            }else{
                const user = new userModel({email, password:hash});
                await user.save();
                res.status(200).json({msg: "Successfully Register", user: req.body});
            }
          })
      }
    }catch(err){
        res.status(400).json({error:err})
    }
})


userRoute.post("/login", async(req,res) => {
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, (err, decode) => {
                if(decode){
            const token = jwt.sign({course: "BE"}, process.env.secretKey);
            res.status(200).json({msg: "Logged In",token});
                }else{
                    res.status(400).json({msg: "Wrong Credentials"});
                }
            })
        }else{
            res.status(404).json({msg: "User not found"});
        }
    }catch(err){
        res.status(400).json({error:err});
    }
})











module.exports = {
    userRoute
}