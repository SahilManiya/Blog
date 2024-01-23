const express = require('express');
const port = 8007;
var app = express();
const path = require('path');
const db = require('./config/mongoose');
const session=require('express-session')

const cookieparser=require('cookie-parser');

const Admin = require('./models/Admin');
const sliderData=require('./models/slidersite')

const passport = require('passport');
const passportLocal = require('./config/passport-local-stretrgy');


app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use(cookieparser());
app.use(express.static(path.join(__dirname,'assests')));
app.use(express.static(path.join(__dirname,'user_assets')));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));


app.use(session({
    name:'RWN',
    secret: 'RNW',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:1000*60*100
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentic);


app.use('/',require('./routes/user'));

app.use('/admin',require('./routes/admin'));

app.listen(port, (err)=>{
    if(err){
        console.log("Something Went Wrong");
        return false
    }
    console.log(`Server running on port ${port}`);
});