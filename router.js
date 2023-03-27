const express = require('express');
const passport = require('passport');
const router = express.Router();

const conexion = require('./database/db')



router.get('/',(req,res)=>{
    res.render('index')    
});

router.get('/edit',(req,res)=>{
    res.render('edit');
})

router.get('/about',(req,res)=>{
    res.render('about');
})


router.get('/community',(req,res,next)=>{
    if(req.isAuthenticated()) return next();
    
    res.redirect('/login');
} ,(req,res)=>{
    res.render('community')
    
});

router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect: '/login'
}));

router.get('/signup',(req,res)=>{
    res.render('signup');
})
router.post('/signup',(req,res)=>{
    res.render('signup');
})

module.exports = router;