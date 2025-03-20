const bcrypt =  require("bcryptjs")

async function hashed_password (password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

module.exports = hashed_password