const { Command } = require("reconlx");
const ee = require('../../settings/embed.json')
const config = require('../../settings/config.json')
const player = require('../../handlers/player')
module.exports = new Command({
  // options
  name: 'jump',
  description: `Jump to a Song`,
  userPermissions: ['SEND_MESSAGES'],
  category: "Music",
  options: [
    {
      name: "jump",
      description: `Jump to a SONG`,
      type: "NUMBER",
      required: true
    }
  ],
  // command start
  run: async ({ client, interaction, args }) => {
    let member = interaction.guild.members.cache.get(interaction.member.id)
    let channel = member.voice.channel;
    if (!channel) {
      return interaction.followUp(`You Need to Join Voice Channel`)
    }
    let queue = player.getQueue(interaction.guild.id);
    let postion = interaction.options.getNumber('jump')
    if (!queue.songs) {
      return interaction.followUp(`No Songs in Queue`)
    }
    else {
      await queue.jump(postion)
      interaction.followUp(`Song Jumped to ${queue.songs[postion].name}`)
    }
  }
})