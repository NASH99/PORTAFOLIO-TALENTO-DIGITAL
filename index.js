//Importar lo necesario para utilizar la aplicacion
import router from './router.js'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT,apiURL } from './config.js';
const app = express();

//Rutas de __filename para utilizar mas abajo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const urlApi = apiURL;

//Motor de plantilla
import hbs from 'hbs';
app.use(express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
//app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
hbs.registerPartials(__dirname + '/views/partials', function (err) {})
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

//Body parser para obtencion de datos desde el body
import bodyparser from 'body-parser';
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//Importacion de lo necesario para utilizar cookies y passport
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import PassportLocal from 'passport-local';
PassportLocal.Strategy;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('Mi secreto'));
app.use(session({
    secret: 'mi secreto',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

    

//Obteniendo usuarios desde api y comparando para ver si coincide o no
passport.use(new PassportLocal(async function(username,password,done){

    //Funcion obtener usuarios
    async function getUsers() {
        const response = await fetch(urlApi+'/usuarios')
        const data = await response.json()
        return data;
    }
    const users = await getUsers();
    let email;
    let pass;
    let admin;
    let id;
    let name;
    users.forEach(element => {
        if(username === element.emailUsuario && password === element.claveUsuario){     
            const idDatos = element.idUsuario;
            const emaildatos = element.emailUsuario;
            const passdatos = element.claveUsuario;
            const isAdmin = element.isadminUsuario;
            const nameDatos = element.nombreUsuario;
            email = emaildatos;
            pass = passdatos;
            admin = isAdmin;
            id = idDatos;
            name = nameDatos;
        }
    });
    if(username === email && password === pass){
        return done(null, {id:id,name:name,isAdmin:admin});
    }else{
        return done(null,false);
    }
}));

//Serializando usuario passport
passport.serializeUser(function(user,done){
    done(null, user.id);
});
//Deserializar usuario passport
passport.deserializeUser(function(user,done){
    done(null, {id:user.id, name: user.name});
});


//Utilizar rutas de router.js
app.use('/', router);

//Levantar servidor
app.listen(PORT,'0.0.0.0', ()=>{
    console.log('Server corriendo en: http://localhost:'+PORT);
})




