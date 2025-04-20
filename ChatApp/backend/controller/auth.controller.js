import express from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';


export const signup = async(req,res) =>{

    const{email,fullName,password} = req.body;

    try{

        if(password<6){
            return res.status(400).json({message:"Password should be greater than 6 characters"});
        }

        const user = User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = User({
            email,
            fullName,
            password:hashedPassword,
        })

        if(newUser){
            await newUser.save();
            return res.status(200).json({message:"User created successfully"});
    }
    else{

        return res.status(400).json({message:"User not created"});
    }

}

export const login = async(req,res) =>{
    
}

export const logout = async(req,res) =>{
    
}
