const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const port = process.env.PORT || 3000;
const nodEmailer = require("nodemailer");
const currentDate = new Date();
require("dotenv").config();

const app = express();

// HANDLING THE MIDWARE OF THE WEBSITE 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

// HANDLING THE POST ROUTE OF THE WEBSITE 

app.post("/quote", (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const url = req.body.url;
    const budget = req.body.budget;
    const info = req.body.info;
    
    // setting a email transporter 
    
        const transporter = nodEmailer.createTransport({
        host: process.env.Email_Host,
        port: process.env.Email_Port,
        secure: true,
        auth: {
            user: process.env.Email,
            pass: process.env.Password,
        },
        });
        
        
        const mailOptions = {
        from: {
            name: "DavTech",
            address: process.env.Email,
        },
        to: email,
        subject: "Thank you for patronizing DavTech",
        attachments: [{
          filename: "logo.png",
          path: "public/image/logo.png",
          cid: "logo",
        }],
        html: `<h2>You've just send your Quotation</h2>
        <p>Thank you for having trust in us 🙏 we promise never to let you down</p>
        <p>we will contact you in the next few minutes to give you the estimation of your dream website.</p>
        <p>This is the time you send us the mail : ${currentDate.toLocaleTimeString()}</P>
        `
        };
        
        
        transporter.sendMail(mailOptions, (err, info)=>{
            if(err) throw err;
        });
    
        // REDIRECT TO  THE HOME ROUTE 
        res.redirect("/quote");
});


app.post("/contact",(req, res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let tel = req.body.tel;
    let info = req.body.info;
    
     // setting a email transporter 
    
        const transporter = nodEmailer.createTransport({
        host: process.env.Email_Host,
        port: process.env.Email_Port,
        secure: true,
        auth: {
            user: process.env.Email,
            pass: process.env.Password,
        },
        });
        
        
        const mailOptions = {
        from: {
            name: "DavTech",
            address: process.env.Email,
        },
        to: email,
        subject: "Thank you for contacting DavTech",
        attachments: [{
          filename: "logo.png",
          path: "public/image/logo.png",
          cid: "logo",
        }],
        html: `<h2>We've received your info</h2>
        <p>Thank you for contacting DavTech your number one custom website builder</p>
        <p>We responsed shortly please be patient.</p>
        <p>This is the time you send us the mail : ${currentDate.toLocaleTimeString()}</P>
        `
        };
        
        
        transporter.sendMail(mailOptions, (err, info)=>{
            if(err) throw err;
        });
    
    res.redirect("/contact")
})



// HANDLING THE ROUTING OF THE WEBSITE 


app.get("/",(req, res)=>{
    res.render("index")
});
// QUOTE ROUTE 
app.get("/quote", (req, res)=>{
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


app.listen(port, (req,res)=>{
    
});
