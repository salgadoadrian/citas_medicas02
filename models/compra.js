const {Schema , model} = require('mongoose');


const CompraSchema = Schema({
    usuario_id:{
        type : Schema.Types.ObjectId,
        ref:  'Usuario',
        require: [true , 'El usuario es obligatorio']
    },
    pizza_id:{
        type:  Schema.Types.ObjectId,
        ref: 'Pizza',
        required: [true , 'La pizza es obligatoria']
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    direccion:{
        type: String,
        required: [true , 'La direccion es obligatoria']
    },
    precio: {
        type: Number,
        default: 0,
        required: true,
    },
    cantidad:{
        type: Number,
        default: 1
    },
    pagado: {
        type: Boolean,
        required: true,
        default: false
    }
});

CompraSchema.methods.toJSON = function() {
    const { __v, _id ,estado ,  ...data  } = this.toObject();
    data.uid = _id;
    return data;
}

module.exports = model('Compra', CompraSchema);
