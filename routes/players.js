const express = require('express');
const router = express.Router();
const Players = require('../models/Players');

/**
 * List all players.
 * @name GET/api/players/all
 * @return {Player[]} - list of players
 */
router.get('/all', async (req, res) => {
    try {
        const players = await Players.findAll();
        if (players === null) {
            res.status(400).json({
                error: `No players to display.`,
            }).end();
        } else {
            res.status(200).json(players).end();
        }
    } catch (err) {

    }
});


module.exports = router;
