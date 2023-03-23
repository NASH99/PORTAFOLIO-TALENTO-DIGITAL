const express = require('express');
const app = express();
const port = 3001;

app.use(express.static(__dirname + '/public'));

//Motor de plantilla

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {})
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')


app.use('/', require('./router'));

app.listen(port, ()=>{
    console.log('Server corriendo en: http://localhost:'+port);
})