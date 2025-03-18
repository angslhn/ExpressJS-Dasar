const { Router } = require("express");
const validation = require("../middlewares/validation")
const { home, get_data, added_data } = require("../controllers/data")

const route = Router();

route.get("/", home);
route.get("/user/data/:id", get_data);
route.post("/api/auth/users", validation, added_data);

module.exports = route