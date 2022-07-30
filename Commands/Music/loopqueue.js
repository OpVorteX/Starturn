const { Command } = require("reconlx");
const ee = require('../../settings/embed.json')
const config = require('../../settings/config.json')
const player = require('../../handlers/player')
module.exports = new Command({
  // options
  name: 'loopqueue',
  description: `Loop a Queue`,
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
    if (queue.repeatMode === 2) {
      queue.setRepeatMode(0)
      return interaction.followUp(`Queue Loop Disabled`)
    }
    else {
      await queue.setRepeatMode(2)
      interaction.followUp(`Queue on loop`)
    }
  }
})