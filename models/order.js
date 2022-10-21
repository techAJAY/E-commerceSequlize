const { Sequelize, DataTypes, BOOLEAN,STRING,INTEGER } = require("sequelize");

 module.exports = (Sequelize, DataTypes)=>{
  const Orders = Sequelize.define('orders',{
    userId: {
        type:INTEGER,
        allowNull: false,
      },
      // productId:{
      //   type:INTEGER,
      //   allowNull: false,
      //   set(val) {
      //     this.setDataValue('productId',val.join(';'));
      //  },
      //},
       
      payment_Mode:{
        type:STRING,
        allowNull:true,
        validate: {
          isIn:[['cod','online']]
        },
        defaultValue:'cod'
      },

      payment_Status:{
        type:STRING,
        allowNull:true,
        defaultValue:"pending"
      },
      
    shippingAddress:{
        type:STRING
    },
    billingAddress:{
        type:STRING
    },
    // shipping_status:{
    //     type:STRING
    // },
    // total_quantity:{
    //     type:INTEGER
    // },
    total_amount:{
        type:INTEGER
    },

  })
  

  return Orders;
 }

