const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')


const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Title')
	.setURL('https://www.youtube.com/')
	.setAuthor({ name: 'Cisco_Kun', iconURL: 'https://a.ppy.sh/20477008?1611963495.jpeg', url: 'https://osu.ppy.sh/users/20477008' })
	.setDescription('Some description here')
	.setThumbnail('https://a.ppy.sh/20477008?1611963495.jpeg')
	.addFields(
		{ name: 'Inline field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://a.ppy.sh/20477008?1611963495.jpeg')
	.setTimestamp()
	.setFooter({ text: 'text', iconURL: 'https://a.ppy.sh/20477008?1611963495.jpeg' });


module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('message'),

    async execute(interaction) {
        await interaction.reply({ embeds: [exampleEmbed] })
    }
}