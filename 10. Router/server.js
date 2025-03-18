const route = require("./routes/route")
const express = require("express")
const server = express()
const fs = require("fs")

if (!fs.existsSync("./data")) fs.mkdirSync("./data");

if (!fs.existsSync("./data/users.json"))
  fs.writeFileSync("./data/users.json", JSON.stringify([], null, 2), {
    encoding: "utf-8",
});

server.use(express.json())

server.use(route)

server.listen(3000, () => {
    console.log("The server is running on http://localhost:3000");
});