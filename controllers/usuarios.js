const {request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { message } = require('../helpers/message');

const usuariosGet = async(req = request, res = response) => {
   
    const {limite = 5 , desde = 0} = req.query;

    const resp = await Promise.all([
        Usuario.countDocuments({estado : true}),
        Usuario.find({estado : true})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        resp
    });
}


const usuariosGet_id = async( req , res = response ) => {
  
    const usuario = await Usuario.findById(req.params.id);
    res.json({
        usuario
    })

}

const usuariosPost = async(req, res = response) => {

    const { nombre ,correo, password,rol ,salario} = req.body;
    const dinero_restante = salario;
    const usuario = new Usuario({nombre ,correo, password,rol, salario , dinero_restante});


    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    //guardar en base de datos
    await usuario.save();

    res.json({
        usuario
    });
}
const usuariosPut = async(req, res = response) => {
     
    const { id } = req.params;
    const { _id , password , google , correo , ...resto } = req.body;

    if ( resto.rol ){
        const existeRol = await Role.finOne({rol});
        if ( !existeRol ){
            return res.status(401).json({
                msg: message.mss_009
            })
        }
    }

    //Verificar ai la misma persona que se autentico es la que quiere autenticarse
    if( req.usuario._id != id ) {
        return res.status(401).json({
            msg: message.mss_022
        })
    }
    
    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
}

const usuariosDelete = async(req, res = response) => {

   const usuario = await Usuario.findByIdAndUpdate(req.params.id , {estado : false});
   usuario.estado = false;
    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosGet_id,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
