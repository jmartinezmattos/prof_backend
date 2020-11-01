const router = require('express').Router();
const Profesor = require('../models/profesor')
const Alumno = require('../models/alumno');
const bycript = require('bcrypt');
const alumno = require('../models/alumno');
const generatePassword = require('../lib/passwordUtils').generatePassword;

/*
router.post('/alumno',async (req, res) => {
    try {
        
       
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

*/