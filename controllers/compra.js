const { response } = require('express');
const { Compra , Pizza, Usuario} = require('../models');
const { message } = require('../helpers/message');
const kind_of = require('kind-of');

const ObtenerCompras = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, compras ] = await Promise.all([
        Compra.countDocuments(query),
        Compra.find(query)
            .populate('usuario_id', 'nombre')
            .populate('pizza_id', ['nombre', 'precio'])
            .skip( Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        compras
    });
}

const ObtenerCompra = async (req, res = response) => {
    const { id } = req.params;
    const compra = await Compra.findById( id )
                                .populate('usuario_id', 'nombre')
                                .populate('pizza_id', ['nombre', 'precio']);

    if( !compra.estado ){
        return res.json({
            msg: message.mss_024
        })
    }
    
    res.json( compra );
}

const crearCompra = async(req, res = response ) => {

    let { usuario_id , pizza_id , direccion , cantidad = 1 } = req.body;
 
    const usuario = await Usuario.findById(usuario_id);
    const pizza = await Pizza.findById(pizza_id); 

    if( !usuario.estado){
        return res.json({
            msg: message.mss_026
        })
    }

    if( !pizza.estado){
        return res.json({
            msg: message.mss_020
        })
    }

    if( !direccion ) {
        return res.json({
            msg: message.mss_025
        })
    }
    
    let precio = pizza.precio * cantidad;
    
    const compra_save = new Compra({usuario_id , pizza_id ,  direccion , precio , cantidad , pagado: false});
    await compra_save.save();
        
    res.json(compra_save);
     
}

const actualizarCompra  = async(req, res = response ) => {

    let { cantidad = 1 , pizza_id } = req.body;

    const compra_orig = await Compra.findById(req.params.id);

    if( !compra_orig){
        return res.json({
            msg: message.mss_011
        })
    }

    if( !compra_orig.estado){
        return res.json({
            msg: message.mss_024
        })
    }
    
    let precio = compra_orig.precio;

    if( pizza_id ) {  

        const pizza = await Pizza.findById(pizza_id); 

        if( !pizza.estado){
            return res.json({
                msg: message.mss_020
            })
        }

        precio = pizza.precio * cantidad;

    }else{
        pizza_id = compra_orig.pizza_id; 
        
    }

    const compra = await Compra.findByIdAndUpdate(req.params.id , { cantidad , pizza_id, precio}, {new: true });

    res.json(compra);

}

const actualizarPagadoCompra = async (req, res) => {

    res.json(await Compra.findByIdAndUpdate(req.params.id , {pagado : true , estado : false}, {new: true}))
}

const eliminarCompra = async(req, res = response ) => {

    const { id } = req.params;
    const compraBorrada = await Compra.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( compraBorrada );
    
}


module.exports = {
    ObtenerCompras,
    ObtenerCompra,
    crearCompra,
    actualizarCompra,
    actualizarPagadoCompra,
    eliminarCompra
}