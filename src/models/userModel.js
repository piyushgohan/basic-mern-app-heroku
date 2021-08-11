const mongoose = require('mongoose')
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')

 const userSchema = new mongoose.Schema({
     Name:{
         type:String,
         required:true
     },
     Proffesion:{
         type:String,
         required:true
     },
     Phone:{
         type:Number,
         required:true
     },
     Email:{
         type:String,
         required:true
     },
     
     Password:{
         type:String,
         required:true
     },
     cPassword:{
         type:String,
        
     },
     tokens:[
         {token:{
            type:String,
         required:true 
         }}
     ],
     Messages:[
         {
            Name:{
                type:String,
                required:true
            },
            Email:{
                type:String,
                required:true
            },
            Phone:{
                type:Number,
                required:true
            },
            Message:{
                type:String
            }
         }
     ]

 })

 userSchema.pre("save" , async function(next){
   if(this.isModified("Password"))
   {
       this.Password = await bcryptjs.hash(this.Password , 12)
   }
   next()
 })

 userSchema.methods.generateToken = async function(){
    try {
        const token = await jwt.sign({_id:this._id}, process.env.SECRETKEY)
        console.log(token)
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token
    } catch (error) {
        console.log(error)
    }
 }

  userSchema.methods.addMessage = async function(name, phone, email, message){
      try {
          this.Messages = this.Messages.concat({Name:name,Phone:phone,Email:email,Message:message})
          await  this.save()
          return this.Messages
      } catch (error) {
          console.log(error)
      }

  }

  const userModel = new mongoose.model("userInformation" , userSchema)

  module.exports = userModel