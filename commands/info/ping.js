module.exports = {
    name:'ping',
    description:'example command',
    aliases:['ex']
    run: async (client, message, args) => {
       message.channel.send(`Kijang Satu Masuk, Ganti ${client.ws.ping}`)
}}
