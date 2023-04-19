const express = require('express');
const passport = require('passport');
const router = express.Router();
const conexion = require('./database/db')
const urlApi = 'http://localhost:3001/api'

router.get('/',(req,res)=>{
    /*
    let datos;
    fetch('http://localhost:3001/api/usuarios')
        .then(result => result.json())
        .then((output) => {
            console.log('Output: ', output);
            datos = output;
            res.render('index')   
    }).catch(err => {
        console.error(err)
        res.render('404')
    } );
    */
    res.render('index')   
});


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
//METODO POST PARA GUARDAR NUEVO REGISTRO SIGNUP
router.post("/signup", async (req, res) => {
    const { username, name, lastname, email, password } = req.body;
    const body = { nombre: name, apellido: lastname, nick: username, email: email, clave: password, admin: false }
    const resultado = await fetch(urlApi+'/usuarios', {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });
    //const data = await resultado.json();
    res.render('community');
    //res.render("index", { productos: data });
  });

//OBTENER USUARIOS DE LA API Y MOSTRARLOS EN TABLA MANTENEDOR
router.get('/mantenedor', async (req,res)=>{
    let datos;
    await fetch(urlApi+'/usuarios')
        .then(result => result.json())
        .then(function(data) {
            let usuarios = data;
            res.render('mantenedor/index',{usuarios});
          })
          .catch(function(error) {
            console.log(error);
          });
})
//AGREGAR NUEVO USUARIO POR MANTENEDOR
router.post('/mantenedor', async (req,res)=>{
    let { username, name, lastname, email, password , admin } = req.body;
    let body = { nombre: name, apellido: lastname, nick: username, email: email, clave: password, admin: admin }

    if(admin != 1){
        admin = false;
    } else{
        admin = true;
    }
    const resultado = await fetch(urlApi+'/usuarios', {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });
    //const data = await resultado.json();
    res.redirect('/mantenedor');
    //res.render("index", { productos: data });
});

//EDITAR (PATCH) UN USUARIO EN MANTENEDOR API
router.post('/mantenedor/update', async (req,res)=>{
    let { idusuario,username, name, lastname, email, password , admin } = req.body;
    let body = { nombre: name, apellido: lastname, nick: username, email: email, clave: password, admin: admin }

    await fetch(urlApi+'/usuarios/'+idusuario, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      });
    res.redirect('/mantenedor');
});

router.get('/user',(req,res)=>{
    res.render('user');
})

//falta terminar la ruta eliminar al pulsar delete en mantenedores
router.get('/mantenedor/:idName',(req,res)=>{
    let idName = req.params.idName;
    conexion.query(`delete from perfil where idusuario = '${idName}';`),(error,perfil)=>{
        if(error){
            console.log('HUBO UN PROBLEMA CON ELIMINAR EL PERFIL')
            throw error;
        }else{
            console.log('SE ELIMINO EL PERFIL SATISFACTORIAMENTE')
        }
    }
    conexion.query(`delete from publicacion where idusuario = '${idName}';`),(error,publicacion)=>{
        if(error){
            console.log('HUBO UN PROBLEMA CON ELIMINAR LA PUBLICACION')
            throw error;
        }else{
            console.log('SE ELIMINO LA PUBLICACION SATISFACTORIAMENTE')
        }
    }
    conexion.query(`delete from usuario where idusuario = '${idName}';`,(error,results)=>{
        if(error){
            throw error;
        }else{
            console.log(`USUARIO '${idName}' ELIMINADO CON EXITO`)
        }
    })
    res.redirect('/mantenedor');
})

router.use((req, res,next) => {
    res.status(404).render('404',{
        titulo: "404",
        descripcion: 'Pagina no encontrada'
    })
});

module.exports = router;