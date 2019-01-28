const database = require('../database');

/**
 * @class Players
 * Stores all Players.
 * Note that all methods are static.
 */
class Players {

    /**
     * Return an array of all of the players.
     * @return {Player[]}
     */
    static async findAll() {
        try {
            const sql = `SELECT * FROM stats`;
            const response = await database.query(sql);
            if (response.length === 0) {
                return null;
            }
            return response;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Find a player by id.
     * @param {string} id - id of player to find
     * @return {Player | null} - found Player
     */
    static async findOne(id) {
        try {
            const sql = `SELECT * FROM stats WHERE playerId='${id}'`;
            const response = await database.query(sql);
            if (response.length === 0) {
                return null;
            }
            return response[0];
        } catch (err) {
            throw err;
        }
    }

}

module.exports = Players;