
const { response } = require("express");
const bcryptjs = require('bcryptjs');
const { message } = require('../helpers/message');
const {generarJWT} = require('../helpers/generar_jwt.js');
const Usuario = require('../models/usuario.js');


const login = async(req, res = response) => {
    
    const {correo , password } = req.body;

    //verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if( !usuario ) {
        return res.status(400).json({
            msg: message.mss_007
        })
    }
    
    try {
        
        //si el usuario esta activo
        
        if(!usuario.estado) {
            return res.status(400).json({
                msg: message.mss_007
            })
        }


        //verificar la contrasena
        const validPassword = await bcryptjs.compare(password , usuario.password );
        if(!validPassword){
            return res.status(400).json({
                msg: message.mss_007
            })
        }

        //generar el JWT token
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
     
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: message.mss_008
        })
    }
    
    
    
    
   
}















module.exports = {
    login
}