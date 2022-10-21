const { Sequelize, DataTypes, BOOLEAN,STRING,INTEGER } = require("sequelize");

 module.exports = (Sequelize, DataTypes)=>{
  const Users = Sequelize.define('users',{
     
    firstName:{
      type:STRING(20),
      allowNull: false,
      trim:true,
    },
    lastName:{
      type:STRING(20),
      allowNull: false,
      trim:true,
    },
    email:{
      type:STRING(30),
      allowNull: false,
      //defaultValue:'ajay@gmail.com'
      unique:true,
      isEmail: true, 
     
    },
    password:{
      type:STRING(30),
      allowNull: false,
    },

    mobile:{
      type:STRING(10),
      allowNull: false,
      unique:true,
    },

    role:{
      type:STRING(4),
      defaultValue:"user"
    }

    // status:{
    //   type:BOOLEAN(2),
    // }

  },{
    
  
  })
  

  return Users;
 }

