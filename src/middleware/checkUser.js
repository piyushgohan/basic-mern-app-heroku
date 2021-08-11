const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
const userModel = require('../models/userModel')


const authentication = async(req, res, next) =>{
    try {
  
      console.log("this is auth function")
      const token = req.cookies.jwt;
      console.log(token)
      const verifyToken = jwt.verify(token , process.env.SECRETKEY )
      const rootUser = await userModel.findOne({_id:verifyToken._id, "tokens.token":token})
      
      if(!rootUser)
      {
        return res.status(401).send({"Error": "Unthorised request"})
      }
      else{
        req.rootUser = rootUser
        req.token = token
        req.id= rootUser._id
      }

      next()
      
    } catch (error) {
      res.status(401).send({"Error": "Unthorised request from catch block"})
    }
    
   }

   module.exports = authentication