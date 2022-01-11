const connection = require("../DBConnection/connection") //connection
const sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const User = connection.define('IssuePages', {
    userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    equipmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    equipementName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_issue: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_return: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number_of_eq: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    hasTrigger: true
});


console.log(User);
module.exports = User;