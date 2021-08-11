const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')



router.use(express.json())
router.use(cookieParser())

const userModel = require('../models/userModel')
const auth = require('./checkUser')





router.get("/getdata",auth, (req, res)=>{
  res.status(201).send(req.rootUser)
})

router.get("/about",auth,(req, res)=>{
  if(!req.rootUser)
  {
    return res.status(401).send({error:"not a user"})
  }
  else{
    console.log(req.rootUser)
    res.status(201).send(req.rootUser)
  }
})

router.post("/contact",auth, async(req, res)=>{
    try {
      const userContact = await userModel.findOne({_id:req.id})
      if(userContact)
      {
        console.log(userContact)
        const userMessage = await userContact.addMessage(req.body.Name, req.body.Phone, req.body.Email, req.body.Message)
        await userContact.save()
        res.status(201).send(" message sucessfully inserted")
      }
    } catch (error) {
      console.log(`hello the error is  ${error}`)
    }
})

router.get("/sign-in", (req, res)=>{
    res.send("hello from sign-in page")
})

router.get("/logout",(req, res)=>{
  
    res.clearCookie("jwt",{path:"/"})
    res.status(200).send("user logged out")
})

router.post("/sign-in", async (req, res)=>{
  try {
    const guest  =  await userModel.findOne({Email:req.body.Email})

    
             
    if(!guest)
    {
      return res.status(400).send("Invalid Credentials email ")
    }
   else
   {
    const verifyPassword = await bcryptjs.compare(req.body.Password, guest.Password)
     if(verifyPassword)
     {
       const token = await guest.generateToken()
       console.log(token)
      
        res.cookie("jwt", token, {
          expires: new Date(Date.now + 30000),
         httpOnly:true
       }).send(` Welcome ${guest.Name} to our community`)
        
     }
     else{
      return res.status(400).send("Invalid Credentials ") 
     }
   }
  
  } catch (error) {
    console.log(error)
  }

})

// router.get("/sign-up", (req, res)=>{
//     res.send("hello from sign-up page")
// })

router.post("/sign-up", async(req, res)=>{
    try {
      
      const isExists = await userModel.findOne({Email:req.body.Email})
      if(isExists)
      {
        res.send(`sorry email id ${isExists.Email} already exists`)
      }
      else{
        const User = new userModel({
          Name:req.body.Name,
          Proffesion:req.body.Proffesion,
          Phone:req.body.Phone,
          Email:req.body.Email,
          
          Password:req.body.Password,
          cPassword:req.body.Password
  
      })
       const token = await User.generateToken()

       

       await User.save()
       res.send("inserted Successfully")
      }
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router