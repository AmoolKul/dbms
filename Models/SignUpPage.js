const connection = require("../DBConnection/connection") //connection
const sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const User = connection.define('SignUpPage',
    {
        userid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        emailid: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        initialAutoIncrement: 101,
    }
);

console.log(User);
module.exports = User;