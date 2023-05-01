import express from 'express';
import passport from 'passport';
import { apiURL } from './config.js';
const router = express.Router();
const urlApi = apiURL;

router.get('/', async(req,res)=>{
    await res.render('index')   
});

router.get('/about',(req,res)=>{
    res.render('about');
})

router.get('/community',(req,res,next)=>{
    if(req.isAuthenticated()) {
      console.log(req.session.passport.user)
      if(req.session.passport.user == 13){
        let datos;
        fetch(urlApi+'/usuarios')
          .then(result => result.json())
          .then(function(data) {
              let usuarios = data;
              console.log(usuarios);
              res.render('mantenedor/index',{usuarios});
          })
          .catch(function(error) {
            console.log(error);
          });
        console.log('pase por aqui');
      }
      return next()
      
    };
    res.redirect('/login');
} ,async (req,res)=>{
    
    let top10=await fetch(urlApi+'/top10')
        .then(result => result.json())
        .then(function(data) {
            let top10 = data;
            return top10;
          })
          .catch(function(error) {
            console.log(error);
    });
    let topAfro=await fetch(urlApi+'/topAfro')
        .then(result => result.json())
        .then(function(data) {
            let topAfro = data;
            return topAfro;
          })
          .catch(function(error) {
            console.log(error);
    });

    let topBlues=await fetch(urlApi+'/topBlues')
        .then(result => result.json())
        .then(function(data) {
            let topBlues = data;
            return topBlues;
          })
          .catch(function(error) {
            console.log(error);
    });

    let topJazz=await fetch(urlApi+'/topJazz')
        .then(result => result.json())
        .then(function(data) {
            let topJazz = data;
            return topJazz;
          })
          .catch(function(error) {
            console.log(error);
    });

    let topRyb=await fetch(urlApi+'/topR&b')
        .then(result => result.json())
        .then(function(data) {
            let topRyb = data;
            return topRyb;
          })
          .catch(function(error) {
            console.log(error);
    });
    
    let topSalsa=await fetch(urlApi+'/topSalsa')
        .then(result => result.json())
        .then(function(data) {
            let topSalsa = data;
            return topSalsa;
          })
          .catch(function(error) {
            console.log(error);
    });

    let topRock=await fetch(urlApi+'/topRock')
        .then(result => result.json())
        .then(function(data) {
            let topRock = data;
            return topRock;
          })
          .catch(function(error) {
            console.log(error);
    });

    let topElectronica=await fetch(urlApi+'/topElectronica')
        .then(result => result.json())
        .then(function(data) {
            let topElectronica = data;
            return topElectronica;
          })
          .catch(function(error) {
            console.log(error);
    });

    let topReggaeton=await fetch(urlApi+'/topReggaeton')
        .then(result => result.json())
        .then(function(data) {
            let topReggaeton = data;
            return topReggaeton;
          })
          .catch(function(error) {
            console.log(error);
    });

    let topPop=await fetch(urlApi+'/topPop')
        .then(result => result.json())
        .then(function(data) {
            let topPop = data;
            return topPop;
          })
          .catch(function(error) {
            console.log(error);
    });

    await fetch(urlApi+'/generos')
        .then(result => result.json())
        .then(function(data) {
            let generos = data;
            res.render('community',{generos,top10,topAfro,topBlues,topJazz,topRyb,topSalsa,topRock,topElectronica,topReggaeton,topPop})
          })
          .catch(function(error) {
            console.log(error);
    });
    
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

    let top10=await fetch(urlApi+'/top10')
    .then(result => result.json())
    .then(function(data) {
        let top10 = data;
        return top10;
      })
      .catch(function(error) {
        console.log(error);
});
let topAfro=await fetch(urlApi+'/topAfro')
    .then(result => result.json())
    .then(function(data) {
        let topAfro = data;
        return topAfro;
      })
      .catch(function(error) {
        console.log(error);
});

let topBlues=await fetch(urlApi+'/topBlues')
    .then(result => result.json())
    .then(function(data) {
        let topBlues = data;
        return topBlues;
      })
      .catch(function(error) {
        console.log(error);
});

let topJazz=await fetch(urlApi+'/topJazz')
    .then(result => result.json())
    .then(function(data) {
        let topJazz = data;
        return topJazz;
      })
      .catch(function(error) {
        console.log(error);
});

let topRyb=await fetch(urlApi+'/topR&b')
    .then(result => result.json())
    .then(function(data) {
        let topRyb = data;
        return topRyb;
      })
      .catch(function(error) {
        console.log(error);
});

let topSalsa=await fetch(urlApi+'/topSalsa')
    .then(result => result.json())
    .then(function(data) {
        let topSalsa = data;
        return topSalsa;
      })
      .catch(function(error) {
        console.log(error);
});

let topRock=await fetch(urlApi+'/topRock')
    .then(result => result.json())
    .then(function(data) {
        let topRock = data;
        return topRock;
      })
      .catch(function(error) {
        console.log(error);
});

let topElectronica=await fetch(urlApi+'/topElectronica')
    .then(result => result.json())
    .then(function(data) {
        let topElectronica = data;
        return topElectronica;
      })
      .catch(function(error) {
        console.log(error);
});

let topReggaeton=await fetch(urlApi+'/topReggaeton')
    .then(result => result.json())
    .then(function(data) {
        let topReggaeton = data;
        return topReggaeton;
      })
      .catch(function(error) {
        console.log(error);
});

let topPop=await fetch(urlApi+'/topPop')
    .then(result => result.json())
    .then(function(data) {
        let topPop = data;
        return topPop;
      })
      .catch(function(error) {
        console.log(error);
});

await fetch(urlApi+'/generos')
    .then(result => result.json())
    .then(function(data) {
        let generos = data;
        res.render('community',{generos,top10,topAfro,topBlues,topJazz,topRyb,topSalsa,topRock,topElectronica,topReggaeton,topPop})
      })
      .catch(function(error) {
        console.log(error);
});

    
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
router.get('/mantenedor/:idName', async (req,res)=>{
    let idName = req.params.idName;
    await fetch(urlApi+'/usuarios/'+idName, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
    res.redirect('/mantenedor');
})

router.get('/perfil/:idName', async (req,res)=>{
    let idName = req.params.idName;
    console.log(idName)

    let imagen =await fetch(urlApi+'/perfil/img/'+idName)
        .then(result => result.json())
        .then(function(data) {
            let imagen = data;
            return imagen;
          })
          .catch(function(error) {
            console.log(error);
    });


    await fetch(urlApi+'/perfil/'+idName)
        .then(result => result.json())
        .then(function(data) {
            let usuarios = data;
            res.render('profile',{usuarios,imagen});
          })
          .catch(function(error) {
            console.log(error);
          });

})

//falta terminar ruta de seleccionar genero en community
router.get('/genero/:id', async (req,res)=>{
    let id = req.params.id;
    
    await fetch(urlApi+'/generos/usuarios/'+id)
        .then(result => result.json())
        .then(function(data) {
            let usuariosGenero = data;
            console.log(usuariosGenero)
            let genero = usuariosGenero[0].nombreGenero_musical; //falta agregar una validacion en caso de que no retorne nada
            let nombreGenero = genero.charAt(0).toUpperCase() + genero.slice(1);
            res.render('genres',{usuariosGenero,nombreGenero}) 
          })
          .catch(function(error) {
            console.log(error);
          });
      
});

router.use((req, res,next) => {
    res.status(404).render('404',{
        titulo: "404",
        descripcion: 'Pagina no encontrada'
    })
});

export default router;