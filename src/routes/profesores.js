const express = require('express')
const router = express.Router()
const Profesor = require('../models/profesor')


router.get('/', async (req, res)=> {
    try{
        res.send("De aca salen cosas")
    }catch{
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/:username', getProfesor,(req, res)=> {
    res.send(res.Profesor)
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
    next()
}


module.exports = router