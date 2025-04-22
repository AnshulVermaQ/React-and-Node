import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';


export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;

    try {

        if(!email || !fullName || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be greater than 6 characters" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
        });

        await newUser.save();
        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,
            profilePicture: newUser.profilePicture,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        return res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error: " + error.message });
    }
};



export const logout = async(req,res) =>{
    try{
        res.cookie("jwt","",{maxAge:0});
        return res.status(200).json({message:"Logged out succesfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server Error: " + error.message });
    }

}


export const updateProfile = async(req,res) =>{
    
    try{

        const {profilePicture} = req.body;
        const userId = req.user._id;

        if(!profilePicture){
            return res.status(400).json({message:"Profile picture is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePicture);

        const updatedUser = await User.findByIdAndUpdate(userId,{
            profilePicture:uploadResponse.secure_url,
        },{new:true});


        res.status(200).json(updatedUser);

    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server Error: " + error.message });
    }
}


export const checkAuth = async(req,res) =>{
    try{

        res.status(200).json(req.user);


    }catch(error){
        res.status(500).json({ message: "Internal Server Error: " + error.message });
    }
}