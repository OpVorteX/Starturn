const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const ee = require('../../settings/embed.json')
const config = require('../../settings/config.json')

module.exports = new Command({
    // options
    name: 'invite',
    description: `Get Bot Invite Link`,
    userPermissions: ['SEND_MESSAGES'],
    category: "Info",
    // command start
    run: async ({ client, interaction, args }) => {
        let embed = new MessageEmbed()
            .setColor(ee.embed_color)
            .setTitle(`Thanks For Inviting Me :)`)
            .setDescription(`>>> [Click to Invite](https://discord.com/api/oauth2/authorize?client_id=954969071437377586&permissions=8&scope=bot)`)
            .setFooter(ee.embed_footertext, ee.embed_footericon)
        interaction.followUp({ embeds: [embed], ephemeral: true })
    }
})