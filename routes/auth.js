
const { Router } = require('express');
const {check} = require('express-validator');
const { login} = require('../controllers/auth.js');
const { validarCampos} = require('../middlewares/validar-campos.js');
const { message } = require('../helpers/message');

const router = Router();

router.post('/login',[
    check('correo' , message.mss_018).isEmail(),
    check('password', message.mss_019).not().isEmpty(),
    validarCampos
], login);

 
module.exports = router;
