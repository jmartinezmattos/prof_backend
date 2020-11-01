const router = require('express').Router();
const Profesor = require('../models/profesor')
const Alumno = require('../models/alumno');
const bycript = require('bcrypt');
const alumno = require('../models/alumno');
const generatePassword = require('../lib/passwordUtils').generatePassword;

router.post('/alumno', async (req, res) => {
    try {
        
        const saltHash = generatePassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const alumno = new Alumno({
           username: req.body.username,
           nombre: req.body.name,
           mail: req.body.mail,
           fecha_nacimiento: req.body.fecha_nacimiento,
           hash: hash,
           salt: salt
       })

        const newAlumno = await alumno.save()
        res.status(201).json(newAlumno)
       
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.post('/profesor', async (req, res) => {
    try {
        
        const saltHash = generatePassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        profesor = new Profesor({
           username: req.body.username,
           nombre: req.body.name,
           mail: req.body.mail,
           fecha_nacimiento: req.body.fecha_nacimiento,
           hash: hash,
           salt: salt
       })
       
    } catch (error) {
        res.send(error)
    }
})



module.exports = router;