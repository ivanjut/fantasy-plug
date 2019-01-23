const mysql = require('mysql');

const config = {
    host: 'sql.mit.edu',
    user: 'ivanj',
    password: 'Ivan1998',
    database: 'ivanj+fantasy-plug',
};

class Database {
    constructor(dbConfig) {
        this.connection = mysql.createPool(dbConfig);
    }

    query(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, rows) => {
                if (err) { return reject(err); }
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) { return reject( err ); }
                resolve();
            });
        });
    }

    async createTables() {
        /* Add code here, and uncomment the appropriate lines in bin/www,
         * to create database tables when starting the application
         *
         * Hint: use CREATE TABLE IF NOT EXISTS
         */

        // Users table
        await this.query(`CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );`
        ).catch(err => console.log(err));
    }

    /* Used for testing */
    async clearTables() {
        await database.query('TRUNCATE TABLE users');
    }
}

const database = new Database(config);

module.exports = database;