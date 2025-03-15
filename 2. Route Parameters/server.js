const express = require("express")
const server = express()

const users = [
    { id: 1, username: 'danielbrown', fullname: 'Daniel Brown' },
    { id: 2, username: 'johndoe', fullname: 'John Doe' },
    { id: 3, username: 'janedoe', fullname: 'Jane Doe' },
    { id: 4, username: 'alexsmith', fullname: 'Alex Smith' },
    { id: 5, username: 'emilyjones', fullname: 'Emily Jones' },
    { id: 6, username: 'michaelbrown', fullname: 'Michael Brown' },
    { id: 7, username: 'sarahwhite', fullname: 'Sarah White' },
    { id: 8, username: 'davidlee', fullname: 'David Lee' },
    { id: 9, username: 'olivertaylor', fullname: 'Oliver Taylor' },
    { id: 10, username: 'lucyadams', fullname: 'Lucy Adams' }
];

server.get("/", (req, res) => {
    return res.status(200).send({ Message: "Hello, Buddy!" })
})

server.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.status(400).send({ Message: "Bad request. Invalid ID." })
    }

    const user = users.find((user) => user.id === id)

    if (!user) {
        return res.status(404).send({ message: "User not found." })
    }

    return res.status(200).send({ user })
})

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
})