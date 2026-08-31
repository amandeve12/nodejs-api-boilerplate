const User = require("../models/User")
const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")


const registerUser = async(req,res)=>{
const {name,email,password} = req.body

if(!name || !email || !password) return res.status(401).json({
    success:false, msg:"all fields required"
})

const existingUser = await User.findOne({email})

if(existingUser) return res.status(401).json({
    success:false, msg:"user already exist"
})


const hashPassword = await bcrypt.hash(password,12);

const usercreated = await User.create({email,name,password:hashPassword})


return res.status(201).json({
    success:true, usercreated 
})
}



const loginUser = async(req,res)=>{
const {email,password} = req.body

console.log(email,password);

if(!email || !password) return res.status(401).json({
    success:false, msg:"all fields required",email,password
})

const foundUser = await User.findOne({email})

if(!foundUser) return res.status(401).json({
    success:false, msg:"invalid email or password"
})
const isPasswordCorrect = bcrypt.compare(password, foundUser.password )

if(!isPasswordCorrect) return res.status(401).json({
    success:false, msg:"invalid password"
})

const token = jwt.sign({userId:foundUser._id}, process.env.SECRETE_KEY, {expiresIn:'1d'})



return res.status(201).json({
    success:true, foundUser, token 
})
}

module.exports = {registerUser,loginUser}
