const { Client, Intents, Collection } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const { token, pre, host } = require('./config')
const { name } = require('./helpers')
const me = require('./messageEmbed')
const axios = require('axios').default

const prefix = pre
const Scommand = [
  {
    name: 'customer',
    description: 'Lista todos los usuarios',
    run: async (client, interaction, args) => {
      await interaction.followUp({ content: 'Hola customers' })
    }
  },
  {
    name: 'password',
    description: 'Resetea el password de un usuario',
    run: async (client, interaction, args) => {
      await interaction.followUp({ content: 'hola ping' })
    }
  }
]

client.slash = new Collection()

client.once('ready', async (bot) => {
  console.log(`Bot: ${client.user.username}\n Status: ${bot.presence.status}`)

  client.slash.set(Scommand[0].name, Scommand[0])
  client.slash.set(Scommand[1].name, Scommand[1])

  await client.application.commands.set(Scommand)
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch((err) => { console.log(err) })
  }
  console.log(client.slash.get(interaction.commandName))
  const command = client.slash.get(interaction.commandName)
  if (!command) return interaction.followUp({ content: 'Comando no registrdo' })
  const args = []
  try {
    command.run(client, interaction, args)
  } catch (error) {
    console.log(error)
  }
})

client.on('messageCreate', (msg) => {
  if (!msg.author.bot) {
    if (msg.content.startsWith(prefix)) {
      const args = msg.content.slice(prefix.length + 1).split(/ +/)
      const command = args.shift().toLowerCase()
      if (!command) {
        msg.reply(`Hola ${name(msg)}, cómo quieres gestionar tu tienda hoy! \n\n Escribe "/ec customers" para ver toda la lista de usuarios\n\n Escribe "/ec password {emailDelUsuario}" para que resetees el password de un usuario\n\n Escribe "/ec delete {emailDelUsuario}" para desactivar un usuario\n\n Escribe "/ec activate {emailDelUsuario}" para activar la cuenta de usuario\n\n Escribe "/ec tareas" para ver tus tareas asignadas`)
      }
      if (command === 'customers') {
        axios.get(`${host}/bot`)
          .then(response => {
            response.data.map(user => msg.reply(`${user.name} ${user.lastName} ${user.email} ${user.status}`))
          })
          .catch(error => console.log(error))
      }
      if (command === 'password') {
        axios.post(`${host}/bot/reset`, {
          email: args
        })
          .then(response => msg.reply('Contraseña reseteada'))
          .catch(error => console.log(error))
      }
      if (command === 'delete') {
        axios.post(`${host}/bot/del`, {
          email: args
        })
          .then(response => msg.reply('Usuario eliminado/desactivado'))
          .catch(error => console.log(error))
      }
      if (command === 'activate') {
        axios.post(`${host}/bot/activate`, {
          email: args
        })
          .then(response => msg.reply('Usuario activado'))
          .catch(error => console.log(error))
      }
      if (command === 'tareas') {
        msg.reply({ embeds: [me] })
      }
    }
  }
})

client.login(token)
