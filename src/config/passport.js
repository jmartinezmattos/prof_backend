

const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const Alumno = require('../models/alumno')
const Profesor = require('../models/profesor')
const validPassword = require('../lib/passwordUtils').validPassword;

//const customFields = {//para nombrar los campos como quiero
//    usernameField: 'usuario',
//    passwordField: 'password'
//}


//esta funcion se encarga de verificar que el usuario se al posta
const verifyCallback = (username, password, done) => { //hay que nombrarlos username y password si no definis custom fields
    
    Alumno.findOne({username: username})
        .then((user) => {

            if(!user){
                
                Profesor.findOne({username: username}).then((userprofe) => {
                    user = userprofe
                })

                if(!user){
                    console.log(`No hay usuario de nombre "${username}"`)
                    return done(null, false)//avisa que no esta el usuario en la bdd null = no hay usuario, false = no hay error
                }
            }
            
        //Aca ya encontro o no esl usuario

            console.log(`Se encontro el usuario "${username}"`)

            //aca nos fijamos si la password esta bien
            const isValid = validPassword(password, user.hash, user.salt)

            if(isValid){
                console.log("la pass esta bien")
                return done(null, user) //nos deja entrar en la ruta
            }else{
                console.log("la pass esta mal")
                return done(null, false) //no entra a la siguiene ruta
            }

        })
        .catch((err)=>{
            done(err);
        })
}

const strategy = new LocalStrategy( /*customFields,*/ verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done)=>{
    console.log("Serialize user")
    done(null, user.id)//OJO VER LO DEL ID y si user no es cliente
})

passport.deserializeUser((userId, done) => {
    
    Alumno.findById(userId)
    .then((user) => {
        if(!user){
            Profesor.findById(userId){
                done(null, user)
            }
        }else{
            done(null, user);
        }
        
    })
    .catch(err => done(err))
})