const fs = require("fs")

const users = JSON.parse(
    fs.readFileSync("./data/users.json", { encoding: "utf-8" })
)

const random_id = () => {
    let id;

    do {
      id = [...Array(10)].map(() => Math.floor(Math.random() * 10)).join("")
    } while (users.some((user) => user.id === id))
    
    return id
}

module.exports = random_id