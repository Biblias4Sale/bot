const { MessageEmbed } = require('discord.js')

const me = new MessageEmbed()
  .setColor('BLUE')
  .setTitle('Ir a JIRA')
  .setURL('https://www.noiloan.web.aoo')
  .setAuthor('EC Bot')
  .setDescription('Tareas asignadas a mi')
  // .setThumbnail(asanaLogo)
  .addFields(
    {
      name: 'Tarea 1',
      value: 'Implementar modal de elección de tipo de usuario',
      inline: true
    },
    {
      name: 'Tarea 2',
      value: 'Conectar API de elección de tipo de usuario',
      inline: true
    }
  )
  .setFooter('DMW ->')
  .setTimestamp()

module.exports = me
