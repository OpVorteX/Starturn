const { Command } = require("reconlx");
const { MessageEmbed } = require('discord.js')
const ee = require('../../settings/embed.json')
const config = require('../../settings/config.json')
const player = require('../../handlers/player')
module.exports = new Command({
  // options
  name: 'queue',
  description: `Show Queue of Current Guild`,
  userPermissions: ['SEND_MESSAGES'],
  category: "Music",
  // command start
  run: async ({ client, interaction, args }) => {
    let member = interaction.guild.members.cache.get(interaction.member.id)
    let channel = member.voice.channel;
    if (!channel) {
      return interaction.followUp(`You Need to Join Voice Channel`)
    }
    let queue = player.getQueue(interaction.guild.id)
    if (!queue?.songs) {
      return interaction.followUp(`No Songs in Queue`)
    }
    else {
      let description = queue.songs.map((song, index) => {
        return [
          `\`${index + 1}\` **[${song.name}](${song.url})** \`[${song.formattedDuration}]\``
        ].join(" ")
      }).join("\n")
      let embed = new MessageEmbed()
        .setDescription(`${description.substr(0, 2048) || "No Song in Queue"}`)


      interaction.followUp({ embeds: [embed] })
    }
  }
})