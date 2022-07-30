const { Command } = require("reconlx");
const ee = require('../../settings/embed.json')
const config = require('../../settings/config.json')
const player = require('../../handlers/player')
module.exports = new Command({
  // options
  name: 'volume',
  description: `Set Volume of a Song`,
  userPermissions: ['SEND_MESSAGES'],
  category: "Music",
  options : [
    {
      name : "vol",
      description : `Give me Number between 1 - 200`,
      required : true,
      type : "NUMBER"
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
    let volume = interaction.options.getNumber('vol')
    if (!queue.songs) {
      return interaction.followUp(`No Songs in Queue`)
    } else if (volume > 200) {
      return interaction.followUp(`Please Provide VALID Volume Number 1- 200`)
    }
    else {
      await queue.setVolume(Number(volume))
      interaction.followUp(`Volume set to ${volume}`)
    }
  }
})