import express from 'express';
const router = express.Router();
import passport from 'passport';
import flash from 'connect-flash';
import User from '../models/user.js'


router.get('/', (req,res)=>{
    res.render('home');
});


// router.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });

//front
// getList = () => {
//     fetch('/api/getList')
//     .then(res => res.json())
//     .then(list => this.setState({ list }))
//   }

//++++++++++++++++++++++++++++++
// LOGIN ROUTES
//++++++++++++++++++++++++++++++

//REGISTER NEW USER
router.get('/register', (req,res)=>{
    res.render('user/register');
});

router.post('/register', (req,res)=>{
    const newUser = new User({username: req.body.username});
    const newUserPassword = req.body.password;
 User.register( newUser, newUserPassword)   //тут сначала проверяется, если Юзер создался то назначается ему пароль
     .then(()=>{
         passport.authenticate('local')(req,res, ()=>{           //local stratygi use - попробуй поменяй
             res.redirect('/camp');
         });
     })
     .catch(err=>{
         console.log(err);
         res.render('user/register');
     });
     // res.send('register');
 });



//LOGIN LOGIC
router.get('/login', (req,res)=>{
    res.render('user/login', {message: req.flash('error')});  //3. посылаем сообщение в роут
});

router.post('/login', passport.authenticate('local',
{          //это метод тут из-за passport-local-mongoose 
    successRedirect: '/camp',
    failureRedirect: '/login'
}
) , (req,res)=>{});

router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/camp');
});



export default router;