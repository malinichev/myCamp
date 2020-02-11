
import express from 'express';
import methodOverride from 'method-override';
const   app = express();

import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import flash from 'connect-flash';
            

import User from './models/user.js';
// import seedDB from './seedDB.js';   //для очистки БД
import path from 'path';

import commentRoutes    from './routes/comments.js';
import campRoutes       from './routes/camp.js';
import authRoutes       from './routes/index.js';






const __dirname = path.resolve();
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));  //чтоб пользоватся put

app.use(flash());  //1. чтобы использовать флеш сообщения везде Also, if you're getting an error along the lines of: "req.flash is not a function", then be sure that the following line: app.use(flash());  comes before your passport configuration in app.js


const MONGO_USERNAME = 'serg';
const MONGO_PASSWORD = '31415926535Ss';
const MONGO_HOSTNAME = 'localhost';
const MONGO_PORT = '27017';
const MONGO_DB = 'campDB';

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;


mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })   // указываем имя БД
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })   // указываем имя БД
    .then(() => console.log('campDB Connected!'))
    .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
    });

// seedDB();     //+++++++++++++++++++++++ УДАЛЯЕМ базу 

app.set('view engine','ejs');

//aytorization!!!!
import expressSession from 'express-session';

app.use(expressSession({
    secret: "Serg world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// MIDDELWERE
app.use((req,res,next)=>{   //чтобы у всех роутов был userId = req.user
    res.locals.userId = req.user;
    next();
});


//ROUTER
app.use('/',authRoutes);
app.use('/camp',campRoutes);
app.use('/camp/:id/comments',commentRoutes);

app.listen(80, process.env.localhost, ()=>{
    console.log('run server mySite');
});