const db  = require('../models/index')
const Cart = db.carts;
const User = db.users;
const Products = db.products;


//create cart
    exports.addCart = async(req,res)=>{
        try{
      
       const {userId,productId,subCategory,price,image} = req.body;
      
        const newCarts = new Cart({
            userId:userId,
            productId:productId,
            subCategory:subCategory,
            price:price,
            image:image
        })
        
        const userCart = await newCarts.save();
        return res.status(201).send({message:"cart created successfully",data:userCart})
      
        }catch(err){
          return res.status(500).send({status:false,message:err.message})
        }
        
      }




    //GET cart
    exports.getCart = async(req,res)=>{
        try{

         //const userId = req.params.id
         const getCart =  await User.findAll({
           attributes: ['firstName', 'lastName','mobile'],

        include:[{
          model:Products,
          //as:'POST DETAILS',
          attributes:['subCategory','price','image'],
        }],
            where:{id:req.params.id}})
        return res.status(200).send({message:"cart get successfully",data:getCart})
      
        }catch(err){
          return res.status(500).send({status:false,message:err.message})
        } 
      
      }



      //delete cart
    exports.deleteCart = async(req,res)=>{
        try{
         const {userId,productId} = req.body
         const User =  await Cart.destroy({where:{userId:userId,productId:productId}})
         if(!User){
            return res.status(400).send({message:"cart not found or already deleted"})
         }

        return res.status(200).send({message:"cart deleted successfully"})
      
        }catch(err){
          return res.status(500).send({status:false,message:err.message})
        }
        
      }