const express = require('express');
const app = express();
const conexion = require('./database/db')
const port = 3000;

const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('Mi secreto'));
app.use(session({
    secret: 'mi secreto',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function(username,password,done){
    let datos;

    fetch('http://localhost:3001/api/usuarios')
        .then(result => result.json())
        .then((output) => {
            //console.log('Output: ', output);
            datos = output;
            console.log(datos)
            datos.forEach(element => {
                console.log(element.emailUsuario)
                console.log(element.claveUsuario)
                if(username === element.emailUsuario && password === element.claveUsuario){     
                    console.log('USUARIOS CORRECTOS')
                    console.log(element.emailUsuario)
                    console.log(element.claveUsuario) 
                    return done(null, {id:element.idUsuario,name:element.nombreUsuario});
                }
                    console.log('No hay coincidencias')
                    //return done(null,false);

            });

    }).catch(err => {
        console.error(err)
    } );
}));

passport.serializeUser(function(user,done){
    console.log(user.id,user.name)
    done(null, user.id);
});

passport.deserializeUser(function(user,done){
    done(null, {id:user.id, name: user.name});
});

app.use(express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
//app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

//Motor de plantilla

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {})
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')


app.use('/', require('./router'));

app.listen(port, ()=>{
    console.log('Server corriendo en: http://localhost:'+port);

})