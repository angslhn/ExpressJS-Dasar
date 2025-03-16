const express = require("express")
const server = express()
const fs = require("fs")

server.use(express.json())

if (!fs.existsSync("./data")) fs.mkdirSync("./data")
    
if (!fs.existsSync("./data/users.json")) fs.writeFileSync("./data/users.json", JSON.stringify([], null, 2), { encoding: "utf-8" })
    
const users_data = JSON.parse(fs.readFileSync("./data/users.json", { encoding: "utf-8" }))

server.get("/", (req, res) => {
    return res.status(200).send({ Message: "Hello, Buddy!" })
})

const handleDataUser = (req, res, next) => {
    const id = parseInt(req.body.id)

    if (isNaN(id)) return res.status(400).send({ Message: "The requested ID does not exist." })

    const user = users_data.find((user) => user.id === id)

    if (user) return res.status(409).send({ Message: "User already exists." })

    next()
}

server.post("/api/auth/users", handleDataUser, (req, res) => {
    const new_data = req.body
    const users = [...users_data, ...new_data]

    try {
        fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2), { encoding: "utf-8" })
        return res.status(200).send({ Message: "User successfully added." })
    } catch {
        return res.status(500).send({ Message: "An error occurred on the server." })
    }
})

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
})