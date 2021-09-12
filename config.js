require('dotenv').config()

const config = {
  token: process.env.TOKEN,
  pre: process.env.PREFIX,
  host: process.env.HOST
}

module.exports = config
