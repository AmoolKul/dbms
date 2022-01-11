const connection = require("../DBConnection/connection") //connection
const sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const User = connection.define('LoginPage', 
{
    emailid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}
);

console.log(User);
module.exports = User;