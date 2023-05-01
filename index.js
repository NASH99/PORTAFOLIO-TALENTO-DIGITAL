import router from './router.js'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT,apiURL } from './config.js';
const app = express();

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

import bodyparser from 'body-parser';
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import PassportLocal from 'passport-local';
//
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

    async function getUsers() {
        const response = await fetch(urlApi+'/usuarios')
        const data = await response.json()
        return data;
    }

//Obteniendo usuarios desde api y comparando para ver si coincide o no
passport.use(new PassportLocal(async function(username,password,done){
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
            console.log('SE ENCONTRO COINCIDENCIA')
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

passport.serializeUser(function(user,done){
    console.log(user.id,user.name,user.isAdmin)
    done(null, user.id);
});

passport.deserializeUser(function(user,done){
    done(null, {id:user.id, name: user.name});
});



app.use('/', router);

app.listen(PORT,'0.0.0.0', ()=>{
    console.log('Server corriendo en: http://localhost:'+PORT);
})




