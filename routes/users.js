const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config({path:'../config.dev'});
const userModel=require('../models/user');

router.route('/')
.post((request,response)=>{
    const {email,password}=request.body;
    if(!email || !password) return response.status(400).json({message:'Please enter all the details'});
    userModel.findOne({email})
    .then(user=>{
        if(user) return response.status(400).json({message:'user already exists'});
        const newUser=new userModel({email,password});
        bcrypt.genSalt(10,(err,salt)=>{
            if(err) throw err;
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;
                newUser.password=hash;
                newUser.save()
                .then(user=>{
                    jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:3660},(err,token)=>{
                        if(err) throw err;
                        response.status(201).json({user:{id:user.id,email:user.email,password:user.password},token,message:'successfully registered'});
                    })
                })
            })
        })
    })
})
.get(async(request,response)=>{
    const users=await userModel.find();
    if(users) return response.status(200).json({users});
    response.status(404).json({message:'could not retireve users'});
})

module.exports=router;