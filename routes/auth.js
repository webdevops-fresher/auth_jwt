const express=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv');

const router=express.Router();
dotenv.config({path:'../config.dev'});
const userModel=require('../models/user');


// router.route('/')
// .post((request,response)=>{
//     const {email,password}=request.body;
//     if(!email || !password) return response.status(400).json({message:'Please fill all details'});
//     userModel.findOne({email})
//     .then(user=>{
//         if(!user) return response.status(400).json({message:'User does not exists'});
//         //validating password
//         bcrypt.compare(password,user.password)
//         .then(isMatch=>{
//             if(!isMatch) return response.status(400).json({message:'Invalid credentials'});
//             jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:3600},(err,token)=>{
//                 if(err) throw err;
//                 response.json({user:{id:user.id,email:user.email,password:user.password},token})
//             })
//         })
//     })
// })



router.route('/')
.post(async(request,response)=>{
    const {email,password}=request.body;
    console.log(email,password);
    if(!email || !password) return response.status(400).json({message:"fill in the credentials"});
    const user=await userModel.findOne({email});
    if(!user) return response.status(400).json({message:"email does not exists.please register with us"});
    const match=await bcrypt.compare(password,user.password);
    if(!match) return response.status(400).json({message:"invalid credentials"});
    const token=await jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:3600});
    if(!token) return response.status(301).json({message:'could not generate a token'});
    response.status(200).json({user:{id:user.id,email:user.email,password:user.password},token});
})

module.exports=router;
