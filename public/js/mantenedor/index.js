
console.log('funciona')
function obtener() { 
conexion.query('select * from usuario',(error,results)=>{
    if(error){
        throw error;
    }else{
        console.log(results);
    }
});
}
obtener()


