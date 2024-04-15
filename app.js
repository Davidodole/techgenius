const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs")
const session = require("express-session");
const passport = require("passport");
const pg = require("pg");
const PORT = process.env.PORT || 3000;



const app = express();

// HANDLING THE MIDWARE OF THE WEBSITE 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.use(session({
    secret: "MYSECRETE",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


// HANDLING THE ROUTING OF THE WEBSITE 
app.get("/",(req, res)=>{
    res.render("index")
});
// QUOTE ROUTE 
app.get("/quote",(req, res)=>{
    res.render("quote")
});
// PORTFOLIO ROUTE 
app.get("/portfolio",(req, res)=>{
    res.render("portfolio");
})
// CONTACT ROUTE
app.get("/contact",(req, res)=>{
    res.render("contact");
});

// HANDLING THE POST ROUTE OF THE WEBSITE 

app.post("/",(req, res)=>{
    const fName = req.body.fName;
    const email = req.body.email;
    const password = req.body.password;
    res.send("thank you for signing up")
})












app.listen(PORT, (req,res)=>{
    console.log(`http://127.0.0.1:${PORT}`);
});