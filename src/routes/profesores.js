const express = require('express')
const router = express.Router()
const Profesor = require('../models/profesor')
const Materia = require('../models/materia')


router.get('/', async (req, res)=> {
    try{
        const profesores = await Profesor.find()
        res.json(profesores)
    }catch{
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/:username', getProfesor,(req, res)=> {
    res.send(res.profesor)
})

//Creating one
router.post('/', async (req, res)=> {
    
    const profesor = new Profesor(req.body)

    try{
        const newProfesor = await profesor.save()
        res.status(201).json(newProfesor)
    }catch{
        res.status(400).json({message: err.message})
    }
})

//Agregar un plan a un cliente
router.post('/:username/materias', getProfesor,(req, res)=> {
    
    console.log("Entro al post de materias del profe")
    const newMateria = new Materia(req.body)
    res.send(res.profesor)
    //newPlan.markModified("materias")
    newMateria.save()
    console.log("Ahi va el username del profe")
    console.log(res.profesor.username)
    res.profesor.materias.push(newMateria)
    docs.markModified('materias')
    res.profesor.save();
    res.send(newMateria)
})

async function getProfesor(req, res, next){ //faltaria que el get sea segun la cedula
    
    let profesor

    try{
        profesor = await Profesor.findOne({ username: req.params.username }) //ojo aca no me estoy fijando errores
        if(profesor == null){
            return res.status(404).json({message: `No se encuentra el profesor con id ${req.params.id}`})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.profesor=profesor //IMPORTANTE ESTO SE USA DESPUES
    console.log(`El profe es: ${profesor.username}`)
    next()
}



module.exports = router