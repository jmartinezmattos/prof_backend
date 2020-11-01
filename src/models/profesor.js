const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VenueSchema = new Schema({

    house: Boolean,
    address: String,
    lat: Number,
    lng: Number,
    movementkm: Number

})

const ProfesorSchema = new Schema({

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
     salt: String,
     tipo: {
        type: String,
        default: "p"
    },
    comments: {
        type: Array 
    },
    verified: {
        type: Boolean,
        default: false
    },
    schedule: {
        type: Array
    },
    venue: {
        type: [VenueSchema]
    }




})


module.exports = mongoose.model('profesores',ProfesorSchema)