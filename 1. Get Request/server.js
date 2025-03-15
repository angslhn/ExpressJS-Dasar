const express = require('express');
const server = express();

server.get('/', (req, res) => {
    return res.status(200).send({ Message: 'Hello, Buddy!' })
})

server.get('/api/users', (req, res) => {
    return res.status(200).send([
    {
        id: 21,
        username: 'angslhn',
        fullname: 'Aang Solihin'
    },
    {
        id: 34,
        username: 'doniferdiansyah',
        fullname: 'Doni Ferdiansyah'
    },
    {
        id: 65,
        username: 'hidanjaenudin',
        fullname: 'Hidan Jaenudin'
    }
])})

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});