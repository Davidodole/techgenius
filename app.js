const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs")
const session = require("express-session");
const passport = require("passport");
require("dotenv").config()
const LocalStrategy  = require("passport-local").Strategy
const pg = require("pg");
const saltRound = 10;
const port = process.env.PORT || 3000;
const nodEmailer = require("nodemailer");
const currentDate = new Date();


// DATABASE CONNECTION 
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect().then(()=> console.log("database connected!"));

const app = express();

// HANDLING THE MIDWARE OF THE WEBSITE 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.use(session({
    secret: process.env.MYSECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


// HANDLING THE POST ROUTE OF THE WEBSITE 

app.post("/quote", (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const url = req.body.url;
    const budget = req.body.budget;
    const info = req.body.info;

    const quote = db.query(
        "INSERT INTO quoteform (name, email, number, website, budget, info) VALUES($1,$2,$3,$4,$5,$6)",
        [name, email, number, url, budget, info]
    );
    // setting a email transporter 
        const transporter = nodEmailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.API_GMAIL,
            pass: process.env.API_PASSWORD,
        }
        });
        const mailOptions = {
        from: {
            name: "TechGenius",
            address: process.env.API_GMAIL,
        },
        to: email,
        subject: "You've just send your Quotation",
        html: `<h3>Thank you for patronizing us</h3>
        <p>We will get back to you as soon as possible to bring your dream to live </p>
        <p>This is the time youn send us the mail : ${currentDate.toDateString()}</P>
        <p> ${currentDate.getTime()}</p>
        `
        }
        transporter.sendMail(mailOptions, (err, info)=>{
            if(err) throw err;
        });
    
        // REDIRECT TO  THE HOME ROUTE 
        res.redirect("/quote");
})
app.post("/contact",(req, res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let tel = req.body.tel;
    let info = req.body.info;
    console.log(name, email, tel, info);
    res.redirect("/contact")
})



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









// local login passport.strategies 
passport.use(
    "local",
    new LocalStrategy( async(fName, username, password, cb)=>{
        console.log(fName, username, password);
        try{
            const userRow = await db.query(
                "SELECT * FROM userstable WHERE username = $1",
                [username],
            );
            if(userRow.rows.length > 0){
                const userID = userRow.rows[0]
                const hashed = userID.password;
                bcrypt.compare(password, hashed, (err, result)=>{
                    if(err){
                        cb(err)
                    }else{
                        if(result){
                            return cb(null, userID);
                        }else{
                            return cb("please check your email or password");
                        }
                    }
                });
            }else{
                return cb(null, false);
            }
        }catch (error){
            cb(error)
        }
    })
    );

passport.serializeUser((user, cb)=>{
    return cb(null, user);
    console.log(user);
});
passport.deserializeUser((user, cb)=>{
    return cb(null, user);
    console.log(user);
});



app.listen(port, (req,res)=>{
    console.log(`listening to port ${port}`);
});