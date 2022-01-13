//load enviorment variables
require('dotenv').config()

const express = require("express");
const connection = require("./DBConnection/connection")
const path = require("path")
const SignUpPage = require("./Models/SignUpPage")
const IssuePage = require("./Models/IssuePage")
const ReturnPage = require("./Models/ReturnPage")
const BillPage = require("./Models/BillPage")

const PayPage = require("./Models/PayPage")
const EquipmentPage = require("./Models/EquipmentPage")
const JWT_SECRET = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const jwt_decode = require('jwt-decode');



//initialize app

const app = express();
const PORT = 5000;



let currentequipment = {}







//authenticate db connection

connection.authenticate()
    .then(() => {
        console.log("connected");
        app.listen(PORT, () => {
            console.log(`--------SERVER RUNNING ON PORT ${PORT}--------`);


            //add stuff in db



            try {


                setTimeout(() => {

                    const equipments = async () => {
                        const data = await EquipmentPage.bulkCreate([
                            {
                                equipment_name: "Tennis",
                                equipment_availabe: 15,
                                equipment_img: "https://www.sportsmomsurvivalguide.com/wp-content/uploads/2018/06/Wilson-Tennis-Racket-1.jpg",
                                price: 200
                            },
                            {
                                equipment_name: "Baseball",
                                equipment_availabe: 30,
                                equipment_img: "https://bloximages.newyork1.vip.townnews.com/dothaneagle.com/content/tncms/assets/v3/editorial/0/b2/0b28042e-6dae-11eb-97c2-8f164877b14e/60274ba4c866b.image.jpg?resize=1200%2C800",
                                price: 350
                            },
                            {
                                equipment_name: "Archery",
                                equipment_availabe: 25,
                                equipment_img: "https://m.media-amazon.com/images/I/71Q-IbUOQlL._AC_SL1500_.jpg",
                                price: 500
                            },
                            {
                                equipment_name: "Cricket",
                                equipment_availabe: 40,
                                equipment_img: "https://5.imimg.com/data5/SELLER/Default/2021/2/QT/JD/AW/119792758/rk-nimbus-cricket-kit-men-size-500x500.png",
                                price: 350
                            },
                            {
                                equipment_name: "Hockey",
                                equipment_availabe: 40,
                                equipment_img: "https://m.media-amazon.com/images/I/71Q-IbUOQlL._AC_SL1500_.jpg",
                                price: 300
                            },
                            {
                                equipment_name: "Badminton",
                                equipment_availabe: 50,
                                equipment_img: "https://m.media-amazon.com/images/I/81-4rp3jnxL._SL1500_.jpg",
                                price: 150
                            },
                            {
                                equipment_name: "Golf",
                                equipment_availabe: 10,
                                equipment_img: "https://i.insider.com/5f21b84524381734ea40df21?width=1136&format=jpeg",
                                price: 700
                            },

                        ]);
                    }


                    equipments();

                }, 5000)
            } catch (error) {

            }
        });
    })
    .catch(() => {
        console.log("error occured");
    })


//sync the connection
connection.sync({ force: true });




//middleware

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser());



//get routes

app.get("/login", (req, res) => {
    if (req.cookies.jwt) {
        return res.redirect("/")
    }
    res.render('login');
})


app.get("/issue", (req, res) => {
    if (req.cookies.jwt) {
        return res.render("Issue", { equipment: currentequipment })
    }
    res.redirect('/login');
})

app.get("/return", (req, res) => {
    if (req.cookies.jwt) {
        return res.render("Return", { equipment: currentequipment })
    }
    res.redirect('/login');
})

app.get("/aboutus", (req, res) => {
    if (req.cookies.jwt) {
        return res.render("AboutUs")
    }
    res.render('login');
})

app.get('/logout', (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/login")
})

app.get("/getequipment", (req, res) => {

    EquipmentPage.findAll()
        .then((data) => {
            // console.log(data);
            let equipemnts_array = []
            data.map((equipment) => {
                equipemnts_array.push(equipment.dataValues)
            })

            console.log(equipemnts_array);
            currentequipemt = equipemnts_array;
            return res.send(equipemnts_array)
        })

})


app.get("/signup", (req, res) => {
    res.render('signup');
})


app.get("/", (req, res) => {
    let user_token;
    console.log(req.cookies)
    if (req.cookies.jwt) {
        user_token = req.cookies.jwt;
    }
    try {
        const user = jwt.verify(user_token, `${JWT_SECRET}`);
        console.log("verified", user)

    } catch (error) {
        return res.redirect("/login");
    }
    return res.render('equipment');
})

app.get("/paypage", (req, res) => {

    const user = jwt.verify(req.cookies.jwt, `${JWT_SECRET}`);
    console.log("rhgurhguh", user);

    IssuePage.findOne(
        {
            where:
            {
                userid: user.id
            }
            ,
            order: [
                ['createdAt', 'DESC']
            ]
        }
    )
        .then((usereq) => {
            let { userid, equipmentId, equipmentName, number_of_eq, price } = usereq.dataValues


            return res.render("Pay", { userid, equipmentId, equipmentName, number_of_eq, price })



        })

})



//post routes



app.post("/payment_details", (req, res) => {

    console.log(req.body);
    BillPage.create({
        name: `${req.body.name}`,
        cardno: `${req.body.cardno}`
    })

        .then(() => {
            // res.send("success")
        })




})

app.post("/issueequipment", (req, res) => {


    if (req.body == null) {
        return res.redirect("/");
    }



    const user = jwt.verify(req.cookies.jwt, `${JWT_SECRET}`);
    console.log("rhgurhguh", user);

    console.log(req.body)

    EquipmentPage.findOne({ where: { equipment_no: req.body.id } })
        .then((equipment) => {

            console.log(equipment.dataValues)
            let { equipment_no, equipment_name, equipment_availabe, equipment_img, price } = equipment.dataValues




            currentequipment = {
                name: equipment_name,
                eq_id: equipment_no,
                user_id: user.id,
                available: equipment_availabe,
                image: equipment_img,
                price: price
            }

            res.send({
                status: 1,
                message: "item saved"
            })
        })



})

app.post("/signup", (req, res) => {
    const { email, password } = req.body

    SignUpPage.findOne({ where: { emailId: email } })
        .then((user) => {
            if (!user) {
                console.log("no user like that found");
                SignUpPage.create({
                    emailid: `${email}`,
                    password: `${password}`
                })
                    .then(() => {
                        console.log("new user created");
                    })

                return res.send({
                    loginstatus: true,
                })
            } else {
                return res.send({

                    loginstatus: false,
                    message: "User already exists"
                })
            }
        })
})

app.post("/login", (req, res) => {

    if (req.cookies.jwt) {
        return res.redirect("/")
    }

    let { email, password } = req.body
    console.log(req.body)

    SignUpPage.findOne({ where: { emailid: email } })
        .then((user) => {
            if (!user) {
                return res.send({

                    loginstatus: false,
                    message: "User not found!"
                })
            }
            else {
                console.log(user.dataValues)

                let registereduser = user.dataValues;
                let userid = registereduser.userid;
                let user_password = registereduser.password;

                if (user_password !== password) {
                    return res.send({

                        loginstatus: false,
                        message: "Incorrect password"
                    })
                }
                else {
                    //login successful
                    const token = jwt.sign(
                        {
                            id: userid,
                            email: email
                        },
                        `${JWT_SECRET}`
                    );
                    res.cookie("jwt", token)



                    return res.send({

                        loginstatus: true,
                        message: "Login Successful!"
                    })

                }
            }
        })



})


app.post("/Payment", (req, res) => {

    console.log("hadvhja", req.body);
    IssuePage.create({
        userid: `${req.body.userid}`,
        equipmentId: `${req.body.eqid}`,
        equipmentName: `${req.body.eqname}`,
        date_of_issue: `${req.body.doi}`,
        date_of_return: `${req.body.dor}`,
        number_of_eq: `${req.body.no_of_eq}`,
        price: `${req.body.price}`

    })
        .then(() => {
            console.log("new user created");
            res.redirect('/paypage');
        })
})










