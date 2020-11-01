const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AlumnoSchema = new Schema({

    tipo: {
        type: String,
        default: 'a'
    },
    username: { 
        type: String,
        unique : true,
        required: true
     },
     nombre: {
         type: String,
         required: true,
         default: "Sin nombre"
     },
     fecha_nacimiento: Date,
     nro_contacto: String,
     mail: String,
     hash: String,
     salt: String

})

module.exports = mongoose.model('alumnos',AlumnoSchema)