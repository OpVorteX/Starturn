const { Command } = require("reconlx");
const ee = require('../../settings/embed.json')
const config = require('../../settings/config.json')
const player = require('../../handlers/player')
module.exports = new Command({
  // options
  name: 'loop',
  description: `Loop a Song`,
  userPermissions: ['SEND_MESSAGES'],
  category: "Music",
  // command start
  run: async ({ client, interaction, args }) => {
    let member = interaction.guild.members.cache.get(interaction.member.id)
    let channel = member.voice.channel;
    if (!channel) {
      return interaction.followUp(`You Need to Join Voice Channel`)
    }
    let queue = player.getQueue(interaction.guild.id);
    let volume = interaction.options.getNumber('vol')
    if (queue.repeatMode === 1) {
      queue.setRepeatMode(0)
      return interaction.followUp(`Song Loop Disabled`)
    }
    else {
      await queue.setRepeatMode(1)
      interaction.followUp(`Song on loop`)
    }
  }
})