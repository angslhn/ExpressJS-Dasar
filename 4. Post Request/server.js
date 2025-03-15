const express = require("express")
const fs = require("fs")
const server = express()

server.use(express.json())

if (!fs.existsSync('./data')) fs.mkdirSync('./data')

if (!fs.existsSync('./data/users.json')) fs.writeFileSync('./data/users.json', JSON.stringify([], null, 2), { encoding: 'utf-8' })

server.get("/", (req, res) => {
    return res.status(200).send({ Message: "Hello, Buddy!" })
})

server.post("/api/auth/users", (req, res) => {
    const { id, username, fullname } = req.body
    
    const users = JSON.parse(fs.readFileSync('./data/users.json', { encoding: 'utf-8' }))
    
    const user = users.find((data) => data.username === username)

    if (user) return res.status(409).send({ Message: "User already exists." })

    const data_users = [...users, { id, username, fullname }] 

    try {
        fs.writeFileSync('./data/users.json', JSON.stringify(data_users, null, 2), { encoding: 'utf-8' })
        return res.status(201).send({ Message: 'User successfully added.' })
    } catch {
        return res.status(500).send({ Message: "Failed to added user data." });
    }
})

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
})