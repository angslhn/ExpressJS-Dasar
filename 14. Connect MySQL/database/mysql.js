const mysql = require("mysql2/promise");

let connection

async function createConnection () {
    try {
        connection = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "1234567890",
            database: "informations",
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });

        const resultConnection = await connection.getConnection()
        console.log("Database successfully connected.")
        resultConnection.release()
    } catch {
        console.log("Database failed to connect.")
    }
}

createConnection()

module.exports = () => connection