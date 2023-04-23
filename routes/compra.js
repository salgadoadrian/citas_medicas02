
const { Router  } = require('express');
const { check   } = require('express-validator');
const { message } = require('../helpers/message')

const {
    validarCampos,
    validarJWT,
    esJefeRole,
    esAdminRole
} = require('../middlewares/index.js');


const{  
    existeUsuarioPorId,
    existePizzaPorId,
    existeCompraPorId
} = require('../helpers/db_validators.js');

const { 
    ObtenerCompras,
    ObtenerCompra,
    crearCompra,
    actualizarCompra,
    actualizarPagadoCompra,
    eliminarCompra
    
} = require('../controllers/compra.js');

const router = Router();

router.get('/', ObtenerCompras);

router.get('/:id', [
    check('id', message.mss_003).isMongoId(),
    check('id').custom(existeCompraPorId),
    validarCampos,
],ObtenerCompra);

router.post('/', [ 
    validarJWT,
    check('usuario_id', message.mss_003).isMongoId(),
    check('usuario_id').custom(existeUsuarioPorId),
    check('pizza_id', message.mss_003).isMongoId(),
    check('pizza_id').custom(existePizzaPorId),
    validarCampos
], crearCompra );

router.put('/:id', [
    validarJWT,
    check('id', message.mss_003).isMongoId(),
    check('id').custom(existeCompraPorId),
    validarCampos
],actualizarCompra);

router.put('/pagado/:id', [
    validarJWT,
    check('id', message.mss_003).isMongoId(),
    check('id').custom(existeCompraPorId),
    esAdminRole,
    validarCampos
],actualizarPagadoCompra);

router.delete('/:id',[
    validarJWT,
    check('id', message.mss_003).isMongoId(),
    check('id').custom(existeCompraPorId),
    validarCampos
] , eliminarCompra);


module.exports = router;