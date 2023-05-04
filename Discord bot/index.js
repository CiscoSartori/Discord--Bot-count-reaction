const { Client, Events, GatewayIntentBits, Collection, Partials } = require('discord.js');
const { TOKEN } = require('./config');
const db = require('./db')

const server = 'Server'
const discord = 'Discord'

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions]
	,partials: [Partials.Message, Partials.Channel, Partials.Reaction], });

const fs = require('node:fs')
const path = require('node:path');
const { Console } = require('node:console');

const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

client.commands = new Collection()

for (const file of commandsFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command)
	} else {
		console.log(`command ${filePath} errado`)
	}
}


client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});



client.on(Events.InteractionCreate, async interaction => {

	if (!interaction.isChatInputCommand()) return
	const command = interaction.client.commands.get(interaction.commandName)

	if (!command) {
		console.error("Comando não encontrado")
		return
	}

	try {
		await command.execute(interaction)
	}
	catch (error) {
		console.error(error)
		await interaction.reply("Houve um erro ao executar esse comando!")
	}
})



client.on('messageCreate', message => {
	if(message.channel.id === '1095082808327798824' && !message.author.bot){
	message.react('👉')
	let data = {
		'_id': message.id,
		'count': 1
		}
	db.insertOne('Server','Discord',data)
	console.log(message.channel.id)
}});



  client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
	}
	let data = {
		'_id': reaction.message.id,
		'count':reaction.count
	}
	
	 let find = await db.findOne('Server','Discord', data)

	if (find && reaction.count > 1){
		await db.updateOne('Server','Discord',data)
	}});




client.login(TOKEN);