const db  = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt =  require('bcryptjs')
const User = db.users;
require('dotenv').config()


//create users
    exports.createUser = async(req,res)=>{
        try{
       //const salt = await bcrypt.genSalt(10);
       const {firstName,lastName,email,password,mobile,role} = req.body;
      
        const newUser = new User({
            firstName:firstName,
            lastName:lastName,
            email:email,
           // password: await bcrypt.hashSync(password, salt),
           password:password,
            mobile:mobile,
            role:role
        })
        
        const getUser = await newUser.save();
        return res.status(201).send({message:"user created successfully",data:getUser})
      
        }catch(err){
          return res.status(500).send({status:false,message:err.message})
        }
        
      }



      //GET All users
    exports.getAllUser = async(req,res)=>{
        try{
      
         const allUser =  await User.findAll()
        return res.status(200).send({message:"allUser get successfully",data:allUser})
      
        }catch(err){
          return res.status(500).send({status:false,message:err.message})
        }
        
      
      }


    //GET user BY id
    exports.getUser = async(req,res)=>{
        try{
         const userId = req.params.id
         const oneUser =  await User.findAll({where:{id:userId}})
        return res.status(200).send({message:"User get successfully",data:oneUser})
      
        }catch(err){
          return res.status(500).send({status:false,message:err.message})
        }
        
      
      }




      //UPDATE USER
      exports.updateUser = async (req,res)=>{
        try{
          const id = req.params.id
          const userId = await User.findOne({ where: { id:id} });
           if(userId){
      
             const data = Object.keys(req.body)
             
             data.forEach((update)=>{
              userId[update] = req.body[update]
             })
      
             await userId.save();
      
             return res.status(201).send({message:"user update successfully",data:userId})
           }
           else{
      
            return res.status(400).send({message:"user not found"})
           }
      
        }catch(err){
          return res.status(500).send({status:false,message:err.message})
        }
         
      }
      
      

      //delete user BY id
    exports.deleteUser = async(req,res)=>{
        try{
         const userId = req.params.id
         const deletedUser =  await User.destroy({where:{id:userId}})
         if(!deletedUser){
            return res.status(400).send({message:"user not found or already deleted"})
         }
        return res.status(200).send({message:"User deleted successfully"})
      
        }catch(err){
          return res.status(500).send({status:false,message:err.message})
        }
        
      }


   
   //user login
   exports.userLogin  =  async (req,res)=>{
    
    try{
    
        const {email,password} = req.body;

        if(!email || !password){
            res.status(400).json({message:'Both email and password is mandatory'})
        }
    
        const userLogin  = await User.findOne({where:{email:email}})
        console.log("user password is:",userLogin.password);
        console.log("password is:",password);

        //if(userLogin){
         //const  isMatch  = await bcrypt.compareSync( userLogin.password,password)
       
         //console.log("is match",isMatch);
         
         //if(!isMatch){
          //  return res.status(400).json({error:'invalid login credential'})
         //}

         const token = await jwt.sign({foo:"E-commerce"},process.env.JWT_SECRET_KEY)
         

         return res.status(200).json({success:true,msg:'login successfully',userLogin,token})

       // }
        // else{
        //     return res.status(401).json({error:'invalid login credential'})
        // }
         
         
        
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}










         
       










