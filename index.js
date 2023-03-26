const express = require('express');
const app = express();
const port = 3000;


const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const PassporLocal = require('passport-local').Strategy;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('Mi secreto'));
app.use(session({
    secret: 'mi secreto',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassporLocal(function(username,password,done){
    if(username === 'ignacio' && password === '123')
    return done(null, {id:1,name:'cody'});

    done(null,false);
}));

passport.serializeUser(function(user,done){
    done(null, {id:1, name: 'Cody'});
});
passport.deserializeUser(function(user,done){
    done(null, {id:1, name: 'Cody'});
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