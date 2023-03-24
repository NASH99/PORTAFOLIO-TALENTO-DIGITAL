const express = require('express');
const router = express.Router();

const conexion = require('./database/db')

router.get('/', (req,res)=>{
    
    /*
    conexion.query('Select * from usuarios',(error,results) =>{
        if(error){
            throw error;
        }else{
            res.send(results)
        }
    })
*/
    res.render('index',{variable:'funcionaaaaaaa'})
    
});

router.get('/edit',(req,res)=>{
    res.render('edit');
})

router.get('/about',(req,res)=>{
    res.render('about');
})

module.exports = router;