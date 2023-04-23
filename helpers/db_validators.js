const  Role = require('../models/role.js');
const {Usuario , Pizza, Compra} = require('../models/index.js');
const { message } = require('../helpers/message');


const esRoleValido = async(rol = '') => {

    const existRole = await Role.findOne({rol});
    
    if( !existRole ){
        throw new Error(message.mss_009);
    }  
}


const emailExiste = async(correo = '') =>{

    const existeCorreo = await Usuario.findOne({correo});

    if( existeCorreo ) {
        throw new Error(message.mss_010);

    }
}

const existeUsuarioPorId = async( id ) =>{

    const existeUsuario = await Usuario.findById(id );
  
    if( !existeUsuario ) {
        throw new Error(message.mss_011);
    }
   
}


const existePizzaPorId = async( id ) => { 
    
    const existeProducto = await Pizza.findById(id);

    if ( !existeProducto ) {
        throw new Error(message.mss_011);
    }
}

const existeCompraPorId = async( id ) => { 
    
    const existeCompra = await Compra.findById(id);

    if ( !existeCompra ) {
        throw new Error(message.mss_011);
    }
 
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existePizzaPorId,
    existeCompraPorId
}