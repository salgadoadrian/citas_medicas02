


const validarCampos = require('../middlewares/validar-campos.js');
const validarJWT = require('../middlewares/validar_jwt.js');
const validaRoles = require('../middlewares/validar_roles.js');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}