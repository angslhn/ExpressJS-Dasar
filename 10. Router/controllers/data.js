const fs = require("fs")
const random_id = require("../utils/random_id")

exports.home = (req, res) => {
  return res.status(200).send({ Message: "Hallo, buddy!" })
}

exports.get_data = (req, res) => {
  const id = parseInt(req.params.id)

  if (isNaN(id))
    return res
      .status(400)
      .send({ Message: "The requested ID does not exist." })

  const users = JSON.parse(
    fs.readFileSync("./data/users.json", { encoding: "utf-8" })
  )

  const user = users.find((user) => user.id === id)

  if (!user) return res.status(404).send({ Message: "User not found." })

  res.status(200).send({ user })
}

exports.added_data = (req, res) => {
  const id = parseInt(random_id())
  const { username, email } = req.body

  const users = JSON.parse(
    fs.readFileSync("./data/users.json", { encoding: "utf-8" })
  )

  const user_is_exist = users.find(
    (user) => user.username === username || user.email === email
  )

  if (user_is_exist)
    return res.status(409).send({ Message: "User already exists." })

  const new_data = [...users, { id, username, email }]

  try {
    fs.writeFileSync("./data/users.json", JSON.stringify(new_data, null, 2), {
      encoding: "utf-8",
    })
    return res.status(201).send({ Message: "User successfully added." })
  } catch {
    return res
      .status(500)
      .send({ Message: "An error occurred on the server." })
  }
}