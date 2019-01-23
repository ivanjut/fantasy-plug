const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * Create a new user
 * @name POST/api/users/signup
 * @return {User} - user
 */
router.post('/signup', async (req, res) => {
    try {
        await Users.signUp(req.body.username, req.body.password);
        res.status(200).json().end();
    } catch (err) {
        res.status(400).json({
            error: `Username ${req.body.username} already exists.`,
        }).end();
    }
});

/**
 * Set username of active user.
 * @name POST/api/users/signin/:username
 * :username login username
 * @return {User} - the logged in user
 */
router.post('/signin/:username', async (req, res) => {
    try {
        const user = await Users.signIn(req.params.username, req.body.password);
        if (user === null) {
            res.status(401).json({
                error: `Sign in failed.`,
            }).end();
        } else {
            req.session.name = req.params.username;
            res.status(200).json(user).end();
        }
    } catch (err) {
        res.status(400).json({
            error: `Username does not exist.`,
        }).end();
    }
});

/**
 * Sign out the active user
 * @name POST/api/users/signout
 */
router.post('/signout', async (req, res) => {
    let activeUser = req.session.name;
    if (activeUser === null || typeof activeUser === 'undefined') {
        res.status(401).json({
            error: `Not signed in.`,
        }).end();
    } else {
        const user = await Users.signOut(activeUser);
        req.session.name = null;
        res.status(200).json(user).end();
    }
});


module.exports = router;
