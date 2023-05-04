const {SlashCommandBuilder} = require('discord.js')
const db = require('../db')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('start the next voting'),


        // deleted __id of reactions to re start voting
        
    async execute(interaction) {
        const message = await interaction.reply({ content: 'Senpai', fetchReply: true })
        db.deleteMany('Server', 'Discord')
        message.reply(`some message`);
    }
}