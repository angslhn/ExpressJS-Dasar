const express = require("express")
const server = express()
const fs = require("fs")

if (!fs.existsSync('./data')) fs.mkdirSync('./data')

if (!fs.existsSync('./data/users.json')) fs.writeFileSync('./data/users.json', JSON.stringify([], null, 2), { encoding: "utf-8" })

server.use(express.json())

server.get("/", (req, res) => {
    return res.status(200).send({ Message: "Hello, Buddy!" })
})

server.put("/api/users/:id", (req, res) => {
    const body = req.body
    const id = parseInt(req.params.id)

    let users_data = null

    try {
        users_data = JSON.parse(fs.readFileSync("./data/users.json", { encoding: "utf-8" }))
    } catch {
        return res.status(500).send({ Message: "An error occurred on the server." })
    }

    if (isNaN(id)) return res.status(400).send({ Message: "The requested ID does not exist." })

    const index = users_data.findIndex((user) => user.id === id)

    if (index === -1) return res.status(404).send({ Message: "User data not found." })

    users_data[index] = { ...users_data[index], ...body }

    try {    
        fs.writeFileSync("./data/users.json", JSON.stringify(users_data, null, 2), { encoding: "utf-8" })
        return res.status(200).send({ Message: "Data successfully updated." })
    } catch {
        return res.status(500).send({ Message: "An error occurred on the server." })
    }
})

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
})