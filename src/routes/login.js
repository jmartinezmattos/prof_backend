const router = require('express').Router();
const passport = require('passport');
const generatePassword = require('../lib/passwordUtils').generatePassword;
const validPassword = require('../lib/passwordUtils').validPassword;

router.post('/', passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/login/login-success'}));

router.post('/profesor', async (req, res) => {

    try{
        
    }catch(err){
        res.status(500).json({message: err.message})
    }

})

router.get('/alumno', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});


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