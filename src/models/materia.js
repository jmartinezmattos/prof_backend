const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MateriaSchema = new Schema({
    nombre: String,
    puntuacion: String,
    clases: String
})

module.exports = mongoose.model('materias',MateriaSchema)