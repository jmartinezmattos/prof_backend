const router = require('express').Router();
const passport = require('passport');
const generatePassword = require('../lib/passwordUtils').generatePassword;
const validPassword = require('../lib/passwordUtils').validPassword;

router.post('/', passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/login/login-success'}));

router.get('/profesor', async (req, res) => {

    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

})

router.get('/alumno', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/login/alumno">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

var alumn = function (req, res, next) {
    req.body.tipo = 'a'
    console.log(req.body)
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    //res.header('Access-Control-Allow-Origin', "http//localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, Cookie');
    next()
};

var prof = function (req, res, next) {
    req.body.tipo = 'p'
    console.log(req.body)
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    //res.header('Access-Control-Allow-Origin', "http//localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, Cookie');
    next()
};



router.post('/alumno', alumn, passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/login/login-success'}));
router.post('/profesor', prof, passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/login/login-success'}));

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.json({ login: true});
});

//login failure
router.get('/login-failure', (req, res, next) => {
    res.json({ login: false});
});



module.exports = router;