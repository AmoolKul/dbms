const express = require("express");
const connection = require("./DBConnection/connection")

const SignUpPage = require("./Models/SignUpPage")
const LoginPage = require("./Models/LoginPage")
const IssuePage = require("./Models/IssuePage")
const ReturnPage = require("./Models/ReturnPage")
const PayPage = require("./Models/PayPage") 

const app = express();
const PORT = 5000;


app.get("/", (req, res) => {
    res.send("hello")
})

connection.authenticate()
    .then(() => {
        console.log("connected");
        app.listen(PORT, () => {
            console.log(`--------SERVER RUNNING ON PORT ${PORT}--------`);

        });
    })
    .catch(() => {
        console.log("error occured");
    })


//sync the connection
connection.sync({ force: true });



setTimeout(() => {


    IssuePage.create({
        userid: 1,
        equipmentId: 3,
        equipementName: "something",
        date_of_issue: "27-10-2021",
        date_of_return: "27-10-2021",
        number_of_eq: "4"
    })


}, 5000)
