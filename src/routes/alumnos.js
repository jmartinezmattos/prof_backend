const express = require('express')
const router = express.Router()
const Alumno = require('../models/alumno')


router.get('/', async (req, res)=> {
    try{
        const alumnos = await Alumno.find()
        res.json(alumnos)
    }catch{
        res.status(500).json({message: err.message})
    }
})

router.get('/myinfo', async (req, res)=> {
    try{
        const alumnos = await Alumno.find()
        res.json(alumnos)
    }catch{
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/:username', getAlumno,(req, res)=> {
    res.send(res.Alumno)
})

//Creating one
router.post('/', async (req, res)=> {
    
    console.log(req.body)

    const alumno = new Alumno(req.body)

    try{
        const newAlumno = await alumno.save()
        res.status(201).json(newAlumno)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})


async function getAlumno(req, res, next){ //faltaria que el get sea segun la cedula
    
    let alumno

    try{
        alumno = await Alumno.findOne({ username: req.params.username }) //ojo aca no me estoy fijando errores
        if(alumno == null){
            return res.status(404).json({message: `No se encuentra el alumno con id ${req.params.id}`})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.alumno=alumno //IMPORTANTE ESTO SE USA DESPUES
    next()
}


module.exports = router