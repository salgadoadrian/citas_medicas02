const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { message } = require('../helpers/message');
const Usuario = require('../models/usuario.js');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

  
    
    if ( !token ) {
        return res.status(401).json({
            msg: message.mss_013
        });
    }
    

    try {
  
        
        const { uid } = jwt.verify( token, process.env.SECRET0RPRIVATEKEY);

        // leer el usuario que corresponde al uid
        
        const usuario = await Usuario.findById( uid );
       
        
        if( !usuario ) {
            return res.status(401).json({
                msg: message.mss_014
            })
        }

        // Verificar si el uid tiene estado true
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: message.mss_014
            })
        }
        
        
        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: message.mss_014
        })
    }


}




module.exports = {
    validarJWT
}





