const { response } = require('express');
const { Pizza}  = require('../models');
const { message } = require('../helpers/message');


const obtenerPizzas = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, pizza ] = await Promise.all([
        Pizza.countDocuments(query),
        Pizza.find(query)
            .skip( Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        pizza
    });
}

const obtenerPizza = async(req, res = response ) => {

    const { id } = req.params;
    const pizza = await Pizza.findById( id );

    if( !pizza.estado ){
        return res.json({
            msg: message.mss_020
        })
    }
    
    res.json( pizza );

}

const crearPizzas = async(req, res = response ) => {

   let { nombre , precio , descripcion } = req.body;

   nombre = nombre.toUpperCase();
   const existe = await Pizza.findOne({nombre}); 

   if( existe ) {
        return res.status(400).json({
            msg: message.mss_001
        })
   }

   const pizza = new Pizza({nombre , precio , descripcion})
   await pizza.save();
   
   res.json(pizza);

}

const actualizarPizzas = async( req, res = response ) => {

    let { precio , nombre , descripcion} = req.body;

    const pizza = await Pizza.findById(req.params.id);

    if(nombre){
        nombre = nombre.toUpperCase();
        if(pizza.nombre === nombre ) {
            return res.status(400).json({
                msg: message.mss_001
            })
        }
    }else{
        nombre = pizza.nombre; 
    }

    if( !precio ) precio = pizza.precio;  
    if( !descripcion ) descripcion = pizza.descripcion;   
        
    nombre = nombre.toUpperCase();

    res.json({
        msg: message.mss_002,
        value: await Pizza.findByIdAndUpdate( req.params.id, { estado: true , nombre,  precio , descripcion},{ new : true })
    });

}
    

const borrarPizzas = async(req, res = response ) => {

    const { id } = req.params;
    const pizzasBorrada = await Pizza.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( pizzasBorrada );
}




module.exports = {
    obtenerPizzas,
    obtenerPizza,
    crearPizzas,
    actualizarPizzas,
    borrarPizzas
}