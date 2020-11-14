const express = require('express');
const generatePassword = require('../lib/passwordUtils').generatePassword;
const isAlumno = require('../authMiddleware').isAlumno;
const router = express.Router()

//Getting user info
router.get('/', async (req, res) => {
    //Chequear seguridad, se esta enviando el salt y el hash al usuario
    datos = req.user
    datos.hash = null
    datos.salt = null
    res.send(req.user)
})

//Getting user info
router.post('/', async (req, res) => {
    //Chequear seguridad, se esta enviando el salt y el hash al usuario
    datos = req.user
    datos.hash = null
    datos.salt = null
    res.send(req.user)
})

//Cambiar pasword
router.post('/changepassword', isAlumno, async (req, res)=> {

    try{

        const saltHash = generatePassword(req.body.newPassword);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        req.user.salt = salt;
        req.user.hash = hash;

        req.user.save()
        res.send("Contra cambiada")
    }
    catch(error){
        res.send("error")
    }
})

module.exports = router