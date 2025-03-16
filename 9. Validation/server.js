const express = require("express");
const server = express();
const fs = require("fs");
const { body, validationResult } = require("express-validator");

server.use(express.json());

if (!fs.existsSync("./data")) fs.mkdirSync("./data");

if (!fs.existsSync("./data/users.json"))
  fs.writeFileSync("./data/users.json", JSON.stringify([], null, 2), {
    encoding: "utf-8",
  });

const users = JSON.parse(fs.readFileSync("./data/users.json", { encoding: "utf-8" }));

const validation = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username cannot be empty.")
    .matches(/^[a-z0-9]/)
    .withMessage("Username must be lowercase and numbers."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isEmail()
    .withMessage("This email is invalid")
    .normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Registration failed.",
            Errors: errors.array().reduce((acc, err) => {
                if (!acc[err.path]) {
                    acc[err.path] = err.msg
                }

                return acc
            }, {})
        })
    }

    next()
  }
]

const random_id = () => {
    let id;

    do {
      id = [...Array(10)].map(() => Math.floor(Math.random() * 10)).join("")
    } while (users.some((user) => user.id === id))
    
    return id
}

server.get("/", (req, res) => {
  return res.status(200).send({ Message: "Hallo, buddy!" });
});

server.post("/api/auth/users", validation, (req, res) => {
    const id = parseInt(random_id())
    const { username, email } = req.body

    const users = JSON.parse(fs.readFileSync("./data/users.json", { encoding: "utf-8" }));

    const user_is_exist = users.find((user) => user.username === username || user.email === email)

    if (user_is_exist) return res.status(409).send({ Message: "User already exists." })

    const new_data = [...users, { id, username, email }]

    try {
        fs.writeFileSync("./data/users.json", JSON.stringify(new_data, null, 2), { encoding: 'utf-8' })
        return res.status(201).send({ Message: 'User successfully added.' })
    } catch {
        return res.status(500).send({ Message: "An error occurred on the server." })
    }
});

server.listen(3000, () => {
  console.log("The server is running on http://localhost:3000");
});
