const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'prueba',
    user: 'root',
    password: '123456789'
});


conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('CONEXION EXITOSA');
    }
});

module.exports = conexion;