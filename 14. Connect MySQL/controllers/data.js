const bcrypt = require("bcryptjs")
const connection = require("../database/mysql")()
const randomNumber = require("../utils/random_number")
const hashed_password = require("../utils/hashed_password")

exports.home = (req, res) => {
  return res.status(200).send({ Message: "Hallo, buddy!" })
}

exports.login = async (req, res) => {
  const { email, password } = req.body
 
  const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email])

  if (rows.length === 0) return res.status(404).send({ Message: "User not found." })

  const user_password = await bcrypt.compare(password, rows[0].password)

  if (!user_password) return res.status(401).send({ Message: "Password does not match." })

  res.cookie("auth_user", JSON.stringify(rows[0]), { maxAge: 259200000, path: "/"});

  res.status(200).send({ Message: "Authentication access successful." })
}

exports.get_data = async (req, res) => {
  const id = parseInt(req.params.id)

  if (!req.cookies.auth_user) return res.status(401).send({ Message: "Access requires valid credentials." })

  if (!id) return res.status(400).send({ Message: "The requested ID does not exist." })

  const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [id])

  const user = rows[0]

  if (!user) return res.status(404).send({ Message: "User not found." })

  res.status(200).send({ user })
}

exports.register = async (req, res) => {
  const id = parseInt(randomNumber(7))
  const { fullname, username, email, password } = req.body

  const [result] = await connection.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email])

  if (result.length > 0) return res.status(409).send({ Message: "User already exists." })

  const hash_password = await hashed_password(password)

  try {
    await connection.query("INSERT INTO users (id, fullname, username, email, password) VALUES (?, ?, ?, ?, ?)", [id, fullname, username, email, hash_password])
    return res.status(201).send({ Message: "User successfully added." })
  } catch {
    return res
      .status(500)
      .send({ Message: "An error occurred on the server." })
  }
}