
const { Router } = require('express');
const {check} = require('express-validator');
const { message } = require('../helpers/message')

const {
    validarCampos,
    validarJWT,
    esJefeRole,
    tieneRol
} = require('../middlewares/index.js');


const{  
    esRoleValido , 
    emailExiste ,
    existeUsuarioPorId
} = require('../helpers/db_validators.js');

const { 
    usuariosGet,
    usuariosGet_id,
    usuariosPut,
    usuariosPost,    
    usuariosDelete
    
} = require('../controllers/usuarios.js');


const router = Router();



router.get('/', usuariosGet );

router.get('/:id',[
    check('id', message.mss_003).isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosGet_id );

router.put('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
   // check('rol').custom( (rol) => esRoleValido(rol)),
    validarCampos,
], usuariosPut);

router.post('/',[
    check('nombre', 'EL NOMBRE ES OBLIGATORIO').not().isEmpty(),
    check('password', 'El password tiene que tener mas de 5 caracteres').isLength({ min: 5 }),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('correo').custom( (correo) => emailExiste(correo)),

    check('rol').custom( (rol) => esRoleValido(rol)),
    validarCampos
]   
,usuariosPost);

router.delete('/:id',[
    validarJWT,
    esJefeRole,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
], usuariosDelete);

   






module.exports = router;




