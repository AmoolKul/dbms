const connection = require("../DBConnection/connection") //connection
const sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const User = connection.define('BillPage', {
    name: {
        type: DataTypes.STRING,
    },
    cardno: {
        type: DataTypes.STRING,
    },
   
},{
    hasTrigger: true
});


console.log(User);
module.exports = User;