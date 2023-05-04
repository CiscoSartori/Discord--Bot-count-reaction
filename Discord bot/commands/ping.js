const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('reply with pong'),

    async execute(interaction) {
        const message = await interaction.reply({ content: 'Senpai', fetchReply: true })
        message.react('😄');
    }
}