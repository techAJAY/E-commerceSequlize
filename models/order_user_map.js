const { Sequelize, DataTypes, BOOLEAN,STRING,INTEGER, ARRAY} = require("sequelize");

 module.exports = (Sequelize, DataTypes)=>{
  const order_user_maps = Sequelize.define('order_user_maps',{
    userId: {
        type:INTEGER,
        allowNull: false,
      },
    
      productId:{
        type:STRING,
        allowNull:false,
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
  

  return order_user_maps;
 }

