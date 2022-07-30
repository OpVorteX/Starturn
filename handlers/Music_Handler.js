const distube = require('./player')
const Discord = require("discord.js")
module.exports = async (client) => {
  distube.on("playSong", (queue, song) => {
    const playembed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`🎶 Playing `)
    .setThumbnail(song.thumbnail)
    .setDescription(`[${song.name}](${song.url})`)
    .addField("Requested By", `${song.user}`, true)
    .addField("Duration", `${song.formattedDuration.toString()}`, true)
  queue.textChannel.send({ embeds: [playembed] });
  });

  distube.on("addSong", (queue, song) => {
    let playembed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`🎶 Added to Queue `)
    .setThumbnail(song.thumbnail)
    .setDescription(`[${song.name}](${song.url})`)
    .addField("Requested By", `${song.user}`, true)
    .addField("Duration", `${song.formattedDuration.toString()}`, true)
    .setFooter(
      `Coded By DaDevGuy | Codez Studios`,
      song.user.displayAvatarURL({ dynamic: true })
    );

  queue.textChannel.send({ embeds: [playembed] });
  });

  distube.on("addList", (queue, playlist) => {
    let playembed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`🎶 PlayList Added to Queue `)
    .setThumbnail(plalist.thumbnail)
    .setDescription(`[${plalist.name}](${plalist.url})`)
    .addField("Requested By", `${plalist.user}`, true)
    .addField("Duration", `${plalist.formattedDuration.toString()}`, true)
    .setFooter(
      `Coded By DaDevGuy | Codez Studios`,
      plalist.user.displayAvatarURL({ dynamic: true })
    );

  queue.textChannel.send({ embeds: [playembed] });
  });

  distube.on('disconnect', (queue) => {
    queue.textChannel.send(`**❌ Song Queue Ended...**`)
  });

  distube.on("initQueue", queue => {
    queue.autoplay = false;
    queue.volume = 100;
});
}