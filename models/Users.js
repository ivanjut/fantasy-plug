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
            // await bcrypt.hash(password, saltRounds, function(err, hash) {
            //     // Store hash in password DB
            //     try {
            //         const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${hash}')`;
            //         database.query(sql);
            //     } catch (error) {
            //         throw error;
            //     }
            // });
            await bcrypt.hash(password, saltRounds).then(async function(hash) {
                // Store hash in your password DB.
                const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${hash}')`;
                await database.query(sql);
            });
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
    static async signIn(username, password) {
        try {
            const user = await Users.findUser(username);
            const match = await bcrypt.compare(password, user.password);
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
    static async signOut(username) {
        try {
            const user = await Users.findUser(username);
            return user;
        } catch (err) {
            // username doesn't exist
            throw err;
        }
    }

    /**
     * Change username
     * @param {string} username - username of user
     * @param {string} newName
     * @return {User} - user
     */
    static async changeUsername(username, newName) {
        try {
            const sql = `UPDATE users SET username='${newName}' WHERE username='${username}';`;
            const response = await database.query(sql);
            return response;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Change password
     * @param {string} username - username of user
     * @param {string} newPassword - new desired password
     * @return {User} - user
     */
    static async changePassword(username, newPassword) {
        try {
            const hash = bcrypt.hashSync(newPassword, saltRounds);
            const sql = `UPDATE users SET password='${hash}' WHERE username='${username}';`;
            const response = await database.query(sql);
            return response;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Delete a user
     * @param {string} username - username of user
     * @return {User} - user
     */
    static async deleteUser(username) {
        try {
            const sql = `DELETE FROM users WHERE username='${username}';`;
            const response = await database.query(sql);
            return response;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Users;