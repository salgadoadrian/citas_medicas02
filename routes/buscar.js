const Router = require('express');
const { buscar } = require('../controllers/buscar.js')


const router = Router();

router.get('/:coleccion/:termino' , buscar)

module.exports = router;


