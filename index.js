const discord = require('discord.js');
const client = new discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const token = process.env.token;
const prefix = process.env.prefix;

const { config } = require('dotenv');
const snek = require('node-superfetch');

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.queue = new Map();
client.prefix = prefix;
client.hastebin = async text => {
	const { body } = await snek
		.post('https://bin-clientdev.glitch.me/documents')
		.send(text);
	return `https://bin-clientdev.glitch.me/${body.key}`;
};

['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});
	
client.login(token);
