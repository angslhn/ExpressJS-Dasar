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

server.get('/api/users', (req, res) => {
    const { filter, value } = req.query
    
    if (!filter || !value) return res.send(users)

    return res.status(200).send(users.filter((user) => user[filter].includes(value)))
})

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
})