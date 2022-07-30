const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const ee = require('../../settings/embed.json')
const config = require('../../settings/config.json')

module.exports = new Command({
    // options
    name: 'help',
    description: `Show All Commands Of Bot`,
    userPermissions: ['SEND_MESSAGES'],
    category: "Info",
    // command start
    run: async ({ client, interaction, args }) => {
        try {
            if (args[0]) {
                const embed = new MessageEmbed();
                const cmd = client.Commands.get(args[0].toLowerCase())
                if (!cmd) {
                    return interaction.followUp({ embeds: [embed.setColor(ee.embed_wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`)] });
                }
                if (cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``);
                if (cmd.name) embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
                if (cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);
                if (cmd.usage) {
                    embed.addField("**Usage**", `\`${prefix}${cmd.usage}\``);
                    embed.setFooter("Syntax: <> = required, [] = optional");
                }
                return interaction.followUp({ embeds: [embed.setColor(ee.embed_color)] });
            } else {
                let homeEmbed = new MessageEmbed()
                    .setColor(ee.embed_color)
                    .setDescription(`**> Melo Is A Music Bot With Slash Commands\n\n> Free 24/7 VC\n\n> Spotify Support\n\n> SoundCloud Support\n\n> Better Experience!\n\nCOMMANDS\n\n**`)
                    .setTitle(`Information About Melo`)
                    .setFooter("Made With 💖 By DaDevGuy", ee.embed_footericon)

                const commands = category => {
                    return client.Commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
                }
                try {
                    for (let i = 0; i < client.categories.length; i += 1) {
                        const current = client.categories[i];
                        const items = commands(current);
                        homeEmbed.addField(`**${current.toUpperCase()} [${items.length}]**`, `> ${items.join(", ")}`);
                    }
                } catch (e) {
                    console.log(e);
                }
                interaction.followUp({ embeds: [homeEmbed], ephemeral: true })
            }
        } catch (e) {
            console.log(e);
        }
    }
})