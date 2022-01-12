const connection = require("../DBConnection/connection") //connection
const sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const User = connection.define('EquipmentPage', {
    equipment_no :  {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    equipment_name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    equipment_availabe : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    equipment_img : {
        type: DataTypes.STRING,
        allowNull: false
    },
    price : {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    hasTrigger: true
}
);


console.log(User);
module.exports = User;
