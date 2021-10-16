const discord = require('discord.js');
const fs = require('fs');
const configFile = fs.readFileSync('config.json');
const config = JSON.parse(configFile);
const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const token = config.token;
const prefix = config.prefix;
client.commands = new discord.Collection();

function commandregister() {
    fs.readdir('./commands/', (error, files) => {
        files.forEach((file) => {
            const commandname = file.split('.')[0];
            const path = './commands/' + commandname;
            const pather = require(path);
            try {
                client.commands.set(pather.help.name, pather);
            }
            catch(error){
                console.log(`Failed to load module ${path}`);
            }
        });
    });
}

client.on('ready', () => {

    console.log('bot is ready');
    client.user.setActivity('Have a great day', {
        type: 'PLAYING'
    });
    commandregister();
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

}


client.on('messageCreate', (msg) => {
    const content = msg.content;
    if (content.startsWith(prefix)) {
        const userInput = content.split(' ');
        const commandname = capitalizeFirstLetter(userInput[0].slice(prefix.length));
        const args = userInput.slice(1);
        const command = client.commands.get(commandname);
        if (command != undefined) {
            command.run(msg, client, args);
        }
    }
});
client.login(token);