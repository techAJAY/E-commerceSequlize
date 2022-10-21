const fs = require('fs');
const path = require('path');
const process = require('process')
const dbConfig = require("../config/dbConfig");
const {Sequelize,DataTypes} = require("sequelize");


//database connection
const sequelize = new Sequelize('ecommerce','root', '', {
  host:'localhost',
  dialect:'mysql',
  operatorsAliases:0,

});


    sequelize.authenticate()
    .then(()=>{
        console.log("connected");
    }).catch(err=>{
        console.log(err);
    })
    




const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.users = require('./user')(sequelize, DataTypes)
db.products = require('./product')(sequelize, DataTypes)
db.carts = require('./cart')(sequelize, DataTypes)
db.orders = require('./order')(sequelize, DataTypes)
db.order_user_maps = require('./order_user_map')(sequelize, DataTypes)



//one to many user AND product
     db.users.hasMany(db.products)
     //db.products.belongsTo(db.users)
     db.users.belongsToMany(db.products,{through:'carts',foreignKey:'userId'})
     db.products.belongsToMany(db.users,{through:'carts',foreignKey:'productId'})

     
 
//one to many user AND order and product
db.users.hasMany(db.orders)
db.orders.belongsToMany(db.users,{through:'order_user_maps',foreignKey:'userId'})
db.users.belongsToMany(db.orders,{through:'order_user_maps',foreignKey:'userId'})



db.sequelize.sync({force:false})   //it can delete all database data:// match:/sequlize$/
.then(()=>{
    console.log('sync again');
})

module.exports = db;
