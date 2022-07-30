const { MessageEmbed } = require("discord.js");
const client = require("..");
const ee = require('../settings/embed.json')
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>)`);
    if (!prefixRegex.test(message.content)) return;
    const [, mPrefix] = message.content.match(prefixRegex);
    if (mPrefix.includes(client.user.id)) {
        message.reply({
            embeds: [new MessageEmbed()
                .setColor("RED")
                .setFooter(ee.embed_footertext, ee.embed_footericon)
                .setTitle(`**To See My All Commands Please Type **\`/help\``)]
        })
    }
})