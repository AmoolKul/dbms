const connection = require("../DBConnection/connection") //connection
const sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const User = connection.define('IssuePages', {
    userid: {
        type: DataTypes.INTEGER,
    },
    equipmentId: {
        type: DataTypes.INTEGER,
    },
    equipmentName: {
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
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    returned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    hasTrigger: true
});


console.log(User);
module.exports = User;