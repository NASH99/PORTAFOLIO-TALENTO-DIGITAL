
/*const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'BPMCommunity',
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
*/

const { Pool } = require('pg');

const conexion = new Pool({
    user: 'nash',
    host: 'localhost',
    port: 5432,
    database: 'bpmcommunity'
});

const poolQuery = () => {
    try{
        console.log('CONEXION EXITOSA');
    } catch (err){
        console.log('ocurrio un error')
    }
};

poolQuery();
//conexion.end();

module.exports = conexion;
