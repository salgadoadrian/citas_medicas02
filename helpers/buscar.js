const {response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { message } = require('../helpers/message')
const { 
    Usuario,
    Pizza
} = require('../models');


const buscarUsuario = async(termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino ) ; // true 
    
    if( esMongoID ){
        const usuario = await Usuario.findById( termino );
        return res.json({
            results: (usuario) ? [ usuario ] : []
        })    
    }

    const regex = new RegExp( termino, 'i');

    const usuario = await Usuario.find({ 
        $or: [{ nombre : regex } , { correo: regex }],
        $and: [{ estado : true}]
    });

    res.json({
        results: usuario
    })
   
}


const buscarPizzas = async(termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino ) ; // true 
    
    if( esMongoID ){
        const pizza = await Pizza.findById( termino );

        return res.json({
            results: (pizza) ? [ pizza ] :  message.mss_023 + `con el id: ${termino}`
        })    
    }

    const regex = new RegExp( termino, 'i');

    const pizza = await Pizza.find({ 
        $or: [{ nombre : regex } , {descripcion : regex}],
        $and: [{ estado : true}]
    });

    
    res.json({
        results: pizza
    })
   
}


module.exports = {
    buscarUsuario,
    buscarPizzas
}