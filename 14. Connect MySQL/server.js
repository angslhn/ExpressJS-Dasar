const express = require("express")
const cookie_parser = require("cookie-parser")
const route = require("./routes/route")
const server = express()
const connection = require("./database/mysql")


connection()
server.use(express.json())
server.use(cookie_parser())
server.use(route)

server.listen(3000, () => {
    console.log("The server is running on http://localhost:3000");
});

server.on('error', () => {
  console.log("Server is not running.")
})