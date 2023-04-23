const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole, esJefeRole } = require('../middlewares');

const { 
    crearPizzas,
    obtenerPizzas,
    obtenerPizza,
    actualizarPizzas, 
    borrarPizzas
} = require('../controllers/pizza');

const { existePizzaPorId } = require('../helpers/db_validators');
const { message } = require('../helpers/message');

const router = Router();

router.get('/', obtenerPizzas );


router.get('/:id',[
    check('id', message.mss_003).isMongoId(),
    check('id').custom(existePizzaPorId),
    validarCampos,
], obtenerPizza);


router.post('/', [ 
    esJefeRole,
    check('nombre',message.mss_004).not().isEmpty(),
    check('precio',message.mss_005).not().isEmpty(),
    validarCampos
], crearPizzas );


router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', message.mss_006).isMongoId(),
    check('id').custom( existePizzaPorId ),
    validarCampos
], actualizarPizzas );


router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', message.mss_006).isMongoId(),
    check('id').custom( existePizzaPorId),
    validarCampos,
], borrarPizzas);


module.exports = router;