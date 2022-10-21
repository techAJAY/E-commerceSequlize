const { Sequelize, DataTypes, BOOLEAN,STRING,NUMBER,} = require("sequelize");

 module.exports = (Sequelize, DataTypes)=>{
  const Products = Sequelize.define('products',{
    gender:{
        type:STRING(20),
        allowNull: false,
        isIn:[["Men","Women","Boys","Girls"]],
    },
    category:{
        type:STRING(20),
        allowNull: false,
        isIn:[["western wear","indian&fusion wear","top wear","bottom wear","inner wear&sleep wear"]],
      },

      subCategory:{
      type:STRING,
      allowNull: false,
    },

    price:{
      type:STRING(20),
      allowNull: false,
    },
    quantity:{
      type:STRING(20),
      allowNull: false,     
    },

    image:{
      type:STRING(250),
    }
    
  })

  return Products;
 }

