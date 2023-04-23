const {response } = require('express');

const { 
    buscarPizzas,
    buscarUsuario
} = require('../helpers/buscar.js');

const coleccionesPermitidas = [
    'usuarios',
    'pizzas',
]

const buscar = (req , res = response) => {

    const { coleccion , termino } = req.params;

    if( !coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: { ${ coleccionesPermitidas } }`
        })
    }
    switch( coleccion  ){
        case 'usuarios':
            buscarUsuario(termino , res);
        break;
        case 'pizzas':
            buscarPizzas(termino , res);
        break;
        default:
            res.status(500).json({
                msg: `No esta implementada la busqueda ${ coleccion }`
            })
    }


}


module.exports = {
    buscar
}