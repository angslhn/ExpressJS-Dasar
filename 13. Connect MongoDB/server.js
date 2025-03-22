const express = require("express")
const mongoose = require("mongoose")
const cookie_parser = require("cookie-parser")
const route = require("./routes/route")
const server = express()

mongoose.connect("mongodb://127.0.0.1:27017")
.then(() => {
  console.log("Database successfully connected.")
})
.catch(() => {
  console.log("Database failed to connect.")
})

server.use(express.json())
server.use(cookie_parser())
server.use(route)

server.listen(3000, () => {
    console.log("The server is running on http://localhost:3000");
});

server.on('error', () => {
  console.log("Server is not running.")
})