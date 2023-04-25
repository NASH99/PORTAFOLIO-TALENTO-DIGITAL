const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//const urlApi = 'https://api-portafolio-production.up.railway.app/api'
const urlApi = 'http://localhost:3001/api'

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

//Obteniendo usuarios desde api y comparando para ver si coincide o no
passport.use(new PassportLocal(async function(username,password,done){
    async function getUsers() {
        const response = await fetch(urlApi+'/usuarios')
        const data = await response.json()
        return data;
    }

    const users = await getUsers();
    let email;
    let pass;
    users.forEach(element => {
        if(username === element.emailUsuario && password === element.claveUsuario){     
            const emaildatos = element.emailUsuario;
            const passdatos = element.claveUsuario;
            console.log(emaildatos)
            console.log('SE ENCONTRO COINCIDENCIA')
            email = emaildatos;
            pass = passdatos;
        }
    });
    if(username === email && password === pass){
        return done(null, {id:email,name:pass});
    }else{
        return done(null,false);
    }
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

app.listen(port,'0.0.0.0', ()=>{
    console.log('Server corriendo en: http://localhost:'+port);

})




