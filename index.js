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

client.on('message', async message => {
	if (message.author.bot) return;

	if (!message.guild) return;

	//Message
	if (message.content === `<@${client.user.id}>`) {
		const kawai = client.emojis.cache.get('801780468554006609');
		const mention = new discord.MessageEmbed()
			.setTitle(`Koniciwa`)
			.setDescription(
				`${kawai} Hello Oniichan, My Name is ${
					client.user.username
				} And My Prefix is ${client.prefix}`
			)
			.setColor('BLUE');
		message.channel.send(mention);
	}
	

	//Commands
	if (!message.content.startsWith(prefix)) return;

	if (!message.member)
		message.member = await message.guild.fetchMember(message);

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	
	if (!command) command = client.commands.get(client.aliases.get(cmd));
	if (command) command.run(client, message, args);
});

client.login(token);
