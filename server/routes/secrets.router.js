const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('req.user:', req.user);
    console.log('is authenticated?', req. isAuthenticated())
    console.log('in GET /secret')
    if(req.isAuthenticated()){
        pool.query(`SELECT * FROM "secret" WHERE "secrecy_level" < ${req.user.clearance_level};`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
    
});

module.exports = router;