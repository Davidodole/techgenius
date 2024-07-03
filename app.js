const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const port = process.env.PORT || 3000;
const nodEmailer = require("nodemailer");
const currentDate = new Date();

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
        service: "gmail",
        host: "smtp.ethereal.email",
        port: 465,
        secure: true,
        auth: {
            user: email,
            pass: 'ThisismySecretfortheusers',
        }
        });
        const mailOptions = {
        from: {
            name: "Sending you this new job",
            address: email,
        },
        to: "dola7468@gmail.com",
        subject: "You've just send your Quotation",
        html: `<h2>Please check and give me a feedback!</h2>
        <p>${info}</p>
        <p>This is the time you send us the mail : ${currentDate.getDate()}</P>
        `
        }
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
    // console.log(`http://127.0.0.1:${port}`);
});
