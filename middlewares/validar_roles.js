const { response, request } = require("express");
const { message } = require('../helpers/message');


const esJefeRole = (req , res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: message.mss_015
        });
    }

    const { rol } = req.usuario;
    if( rol !== 'JEFE_ADMIN_ROLE'){
        return res.status(401).json({
            msg: message.mss_021
        });
    }

    next();
}

const esAdminRole = (req , res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: message.mss_015
        });
    }
    
    const { rol } = req.usuario;
    if(rol !== 'ADMIN_ROLE' || rol !== 'JEFE_ADMIN_ROLE'){
        return res.status(401).json({
            msg: message.mss_016
        });
    }

    next();
}



const tieneRol = ( ...roles ) => {
    return (req , res = response, next) => {
        if( !req.usuario ) {
            return res.status(401).json({
                msg: message.mss_015
            });
        }

        if(!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: message.mss_017 +'{ '+roles+' }'
            })
        }



        next();
    }
}

module.exports = {
    esJefeRole,
    esAdminRole,
    tieneRol
}