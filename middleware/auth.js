const db  = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt =  require('bcryptjs')
const User = db.users;
require('dotenv').config()


exports.isAuth = async (req, res, next) => {
    
  try { 

    const token = req.headers['auth']
    console.log(token);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY )
    const user = await User.findOne({id:decoded._id})
    
    if(!user){

      return res.send({message:"token is must"})
    }
     
    req.token = token
    req.user  =  user
    
    next()
    
  }  catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, msg:" User not Authenticate" }) 
    }
  
  }

  
  exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "User access denied" });
    }
    next();
  };
  
  
  exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(400).json({ message: "Admin access denied" });
    }
    next();
  };