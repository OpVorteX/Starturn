const { Command } = require("reconlx");
const ee = require('../../settings/embed.json')
const config = require('../../settings/config.json')
const player = require('../../handlers/player')
module.exports = new Command({
  // options
  name: 'playskip',
  description: `Play a Song By Skip Current Song`,
  userPermissions: ['SEND_MESSAGES'],
  category: "Music",
  options: [
    {
      name: "song",
      description: "Type song name or link",
      type: "STRING",
      required: true,
    }
  ],
  // command start
  run: async ({ client, interaction, args }) => {
    let member = interaction.guild.members.cache.get(interaction.member.id)
    let channel = member.voice.channel;
    if (!channel) {
      return interaction.followUp(`You Need to Join Voice Channel`)
    }
    let song = interaction.options.getString('song')
    player.playVoiceChannel(channel, song, {
      member: member,
      textChannel: interaction.channel,
      skip: true
    })
  }
})