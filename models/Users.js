const database = require('../database');
const bcrypt = require('bcrypt');
const saltRounds = 10;


/**
 * @class Users
 * Stores all Users.
 * Note that all methods are static.
 */
class Users {

    /**
     * Find a User by Name.
     * @param {string} username - name of User to find
     * @return {username | undefined} - found User
     */
    static async findUser(username) {
        try {
            const sql = `SELECT * FROM users WHERE username='${username}';`;
            const response = await database.query(sql);
            return response[0];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Sign up a User.
     * @param {string} username - username of user
     * @param {string} password - desired password
     * @return {User} - created user
     */
    static async signUp(username, password) {
        try {
            const hash = bcrypt.hashSync(password, saltRounds);

            const sql = `INSERT INTO users (username, password) VALUES (${username}, ${hash})`;
            await database.query(sql);

            const selectSQL = `SELECT * FROM users WHERE username=${username}`;
            const response = await database.query(selectSQL).then(res => res);
            return response[0];
        } catch (err) {
            // username already taken
            throw err;
        }
    }

    /**
     * Sign in as a user
     * @param {string} username - username
     * @param {string} password - password
     * @return {User | int | null} - signed in user
     */
    static async signin(username, password) {
        try {
            const user = await Users.findUser(username);
            const match = bcrypt.compareSync(password, user.password);
            if (match === true) {
                return user;
            } else {
                return null;
            }
        } catch (err) {
            // username doesn't exist
            throw err;
        }
    }

    /**
     * Sign out as a user
     * @param {string} username - username of user
     * @return {User} - signed out user
     */
    static async signout(username) {
        try {
            const user = await Users.findUser(username);
            return user;
        } catch (err) {
            // username doesn't exist
            throw err;
        }
    }
}

module.exports = Users;