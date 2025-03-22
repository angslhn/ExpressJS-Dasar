const bcrypt = require("bcryptjs")
const User = require("../models/user")

const hashed_password = require("../utils/hashed_password")

exports.home = (req, res) => {
  return res.status(200).send({ Message: "Hallo, buddy!" })
}

exports.login = async (req, res) => {
  const { email, password } = req.body
 
  const user = await User.findOne(email)

  if (!user) return res.status(404).send({ Message: "User not found." })

  const user_password = await bcrypt.compare(password, user.password)

  if (!user_password) return res.status(401).send({ Message: "Password does not match." })

  res.cookie("auth_user", JSON.stringify(user), { maxAge: 259200000, path: "/"});

  res.status(200).send({ Message: "Authentication access successful." })
}

exports.get_data = (req, res) => {
  const id = parseInt(req.params.id)

  if (!req.cookies.auth_user) return res.status(401).send({ Message: "Access requires valid credentials." })

  if (!id) return res.status(400).send({ Message: "The requested ID does not exist." })

  const user = User.findById(id)

  if (!user) return res.status(404).send({ Message: "User not found." })

  res.status(200).send({ user })
}

exports.register = async (req, res) => {
  const { username, email, password } = req.body

  const user_is_exist = User.findOne({ $or: [{username}, {email}] })

  if (user_is_exist) return res.status(409).send({ Message: "User already exists." })

  const secure_password = await hashed_password(password)

  const new_user_data = new User({ username, email, password: secure_password })

  try {
    await new_user_data.save()
    return res.status(201).send({ Message: "User successfully added." })
  } catch {
    return res
      .status(500)
      .send({ Message: "An error occurred on the server." })
  }
}