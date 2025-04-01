function randomNumber(length) {
  return [...Array(length)].map(() => Math.floor(Math.random() * 10)).join("")
}

module.exports = randomNumber