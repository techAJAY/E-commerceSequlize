const db  = require('../models/index')
const Carts = db.carts;
const Orders = db.orders;
const order_user_maps = db.order_user_maps;
const Products = db.products;
const User = db.users;
require('dotenv').config()


exports.createOrder = async (req, res) => {

    try {
      const { userId,productId,payment_Mode,payment_Status,shippingAddress,billingAddress,total_quantity,total_amount} = req.body;
         
        const user = await Carts.findAll({where:{userId:userId}});
      
        console.log("user is ",user);
        if(!user){
        return res.status(400).send({message:"cart is empty"})
       }
         
        const orders = new Orders({
          userId,
          //productId:productId,
          payment_Mode,
          payment_Status,
          shippingAddress,
          billingAddress,
          total_quantity,
          total_amount
        })

      const saveData = await orders.save()
      console.log("SAVE DATA",saveData);
      

    // if (saveData) {
       await user.map(async(products)=>{
        console.log("product is:",products);
        const orders_users_maps = new order_user_maps({
          userId:userId,
          productId:products.productId,
          subCategory:products.subCategory,
          price:products.price,
          image:products.image,
        })
        await orders_users_maps.save()
      })
    
          //delete user from cart
          // if(saveData){
          //     await Carts.destroy({where:{userId:userId}})
          // 
        return res.status(201).json({ msg: "order added successfully",saveData});
    // }
     //else{
     // return res.send("some error")
     //}
      
      
    
    } catch (err) {
      res.send(err);
    }
  };
  


//GET order
exports.getOrder = async(req,res)=>{
  try{

   //const userId = req.params.id
   const getOrder =  await User.findOne({
    attributes: ['firstName', 'lastName','mobile'],

  include:[{
    model:Orders,
    //as:'POST DETAILS',
   
  }],
  where:{id:req.params.id}})
  return res.status(200).send({message:"order get successfully",data:getOrder})

  }catch(err){
    return res.status(500).send({status:false,message:err.message})
  } 

}


