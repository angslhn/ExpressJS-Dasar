const { Router } = require("express");
const validation = require("../middlewares/validation")
const { home, get_data, login, register } = require("../controllers/data")

const route = Router();

route.get("/", home);
route.get("/user/data/:id", get_data);
route.post("/api/auth/login", validation(["email", "password"]), login);
route.post("/api/auth/register", validation(["username", "email", "password"]), register);

module.exports = route