const { TOKEN, CLIENT_ID, GUILD_ID } = require('./config');

const { REST, Routes, Guild } = require('discord.js')

const fs = require('node:fs')
const path = require('node:path')

const commandsPath = path.join(__dirname,"commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file=> file.endsWith('.js'))

const commands = []

for (const file of commandsFiles){
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({version: '10'}).setToken(TOKEN);

(async() =>{
    try {
        console.log(`Reset ${commands.length}`)

        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {body: commands}
        )
            console.log('Registered')
    } catch (error) {
        console.log(error)
        }
})()