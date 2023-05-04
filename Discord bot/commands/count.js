const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require('../db')



module.exports = {
    data: new SlashCommandBuilder()
        .setName('count')
        .setDescription('start counting'),

    async execute(interaction) {

        let find = await db.find('Server', 'Discord')
        var contar = { count: 0 }
        find.map(function (num) {
            if (contar.count < num.count) contar = num
        });
        msg = await interaction.channel.messages.fetch(contar._id)
       
        const attachment = msg.attachments.first();
        const imageURL = attachment.url;
        console.log(imageURL)







        const exampleEmbed = new EmbedBuilder()


            .setColor(0x0099FF)
            .setTitle('Bannner Vencedor')
            // .setURL('https://pt.pornhub.com/')
            .setAuthor({ name: 'Error 404', iconURL: 'https://a.ppy.sh/20477008?1611963495.jpeg', url: 'https://osu.ppy.sh/users/20477008' })
            .setDescription('ganhou com ' + contar.count +' pontos')
            .setThumbnail(msg.author.displayAvatarURL({dymaic: true}))
            .addFields(
                { name: 'Meu Pinto e pequeno', value: 'ele so tem 20 cm' },
                { name: '\u200B', value: '\u200B' },
                // { name: 'Inline field title', value: 'Some value here', inline: true },
                // { name: 'Inline field title', value: 'Some value here', inline: true },
                // { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .setImage(imageURL)
            .setTimestamp()
            .setFooter({ text: 'Hoje às 18:13', iconURL: 'https://i.pinimg.com/564x/07/b7/10/07b710539b50fd9c49232063ff4aab18.jpg' });


        await interaction.reply({ embeds: [exampleEmbed] });
        console.log(contar)
    }
}