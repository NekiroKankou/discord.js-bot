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
client.prefix = prefix;

['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
		console.log(`
◊═══════════════════════════◊
${client.user.username} Siap Di Gunakan Oniichan.
Name : ${client.user.tag}
Server : ${client.guilds.cache.size}
Member : ${client.users.cache.size}
Channels : ${client.channels.cache.size}
◊═══════════════════════════◊
`);
	});

	client.on('ready', () => {
		setInterval(() => {
			var member = client.users.cache.size;
			let status = `🛡️ ${member} Oniichan | prefix "${prefix}"`;
			client.user.setActivity(status, { type: 'WATCHING' });
		}, 50000);
	});

	client.on('ready', () => {
		client.user.setStatus('idle');
	});

client.login(token);
