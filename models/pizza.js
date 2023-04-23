

const {Schema , model} = require('mongoose');


const PizzaSchema = Schema({
    nombre:{
        type: 'String',
        required: [true, 'El nombre es obligatorio'],
        unique: true,
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    precio: {
        type: Number,
        default: 0,
    },
    descripcion:{
        type: String,
        default: 'Deliciosa'
    },
});

PizzaSchema.methods.toJSON = function() {
    const { __v, estado ,  ...data  } = this.toObject();
    return data;
}

module.exports = model('Pizza', PizzaSchema);
