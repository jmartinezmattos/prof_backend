// git commit -a -m "Description of the changes I made"
// git push heroku master

require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session')
const bodyparser = require("body-parser");

const MongoStore = require('connect-mongo')(session);

app.set('port', process.env.PORT || 3000);

var cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000'
  }));

//conectar a bdd
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('DB connected'))//tira este mensaje si se conecto
    .catch(err => console.log(err))//tira esto si no conecto


//Json middleware para que reconozca las entradas como json
app.use(express.json());

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    //res.header('Access-Control-Allow-Origin', "http//localhost:3000")
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, Cookie');
    if ('OPTIONS' == req.method) {
         res.send(200);
     } else {
         next();
     }
    });

//Passport

const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
})

app.use(session({
    secret: "secreto", //despues cambiarlo por variable de ambiente
    name:"cookie-vital",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    sameSite: 'none',
    cookie: {
        maxAge: 1000*60*60*24 //esto es un dia
    }
}))

require('./src/config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
})

const login = require('./src/routes/login');
const register = require('./src/routes/register');
const profesores = require('./src/routes/profesores');
const alumnos = require('./src/routes/alumnos');
const myinfo = require('./src/routes/myinfo');

app.use('/login', login);
app.use('/register', register)
app.use('/profesores', profesores);
app.use('/alumnos', alumnos);
app.use('/myinfo', myinfo);

/*
//importing routes
const clientRoute = require('./src/routes/cliente');
const ejercicioRoute = require('./src/routes/ejercicio');
const metricaRoute = require('./src/routes/metrica');
const rutinaRoute = require('./src/routes/rutina');
const login = require('./src/routes/login');
const tiposEjercicio = require('./src/routes/tiposEjercicio');
const myinfo = require('./src/routes/myinfo')

//routes
app.use('/clientes', clientRoute);
app.use('/ejercicios', ejercicioRoute);
app.use('/rutinas', rutinaRoute);
app.use('/metricas', metricaRoute);
app.use('/tiposEjercicio', tiposEjercicio);
app.use('/myinfo', myinfo)
app.use('/', login);

*/

app.listen(app.get('port'), () => console.log(`Server started at port ${app.get('port')}`))











