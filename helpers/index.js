const name = (msg) => {
  let name = msg.author.username
  name = name.split(/ +/).shift()
  return name
}

module.exports = {
  name
}
