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

    let nombres = ['ignacio','manuel','andrea','francisco']

    res.render('community',{nombres})
    
});

router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login',passport.authenticate('local',{
    successRedirect:'/community',
    failureRedirect: '/login'
}));

router.get('/signup',(req,res)=>{
    res.render('signup');
})
router.post('/signup',(req,res)=>{
    let username = req.body.username;
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    console.log(username,name,lastname,email,password)

    conexion.query(`INSERT INTO usuario (nombreUsuario,apellidoUsuario,nickUsuario,emailUsuario,claveUsuario)VALUES('${name}','${lastname}','${username}','${email}','${password}')`,(error,results) =>{
        if(error){
            throw error;
        }else{
            conexion.query('Select * from usuario',(error,results) =>{
                if(error){
                    throw error;
                }else{
                    //console.log(results)
                }
            })
        }
    })
    res.render('community');
})

router.get('/user',(req,res)=>{
    res.render('user');
})

router.use((req, res,next) => {
    res.status(404).render('404',{
        titulo: "404",
        descripcion: 'Pagina no encontrada'
    })
})

module.exports = router;