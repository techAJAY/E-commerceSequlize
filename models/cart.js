const { Sequelize, DataTypes,BOOLEAN,STRING,INTEGER } = require("sequelize");

 module.exports = (Sequelize, DataTypes)=>{
  const Carts = Sequelize.define('carts',{
    userId:{
        type:INTEGER,
        allowNull: false    //required:true

      },
      productId:{
        type:INTEGER,
        allowNull: false    //required:true
      },
    
      subCategory:{
        type:STRING,
        allowNull: false,
      },
  
      price:{
        type:STRING(20),
        allowNull: false,
      },
      image:{
        type:STRING(250),
      }
  })

  return Carts;
 }

