const economy = require('../extra-functionality/economy');

module.exports = {
    name: 'add-bal',
    alias: ["add-balance", 'addbal', 'addbalance'],
    description: 'Fügt einem Nutzer Münzen zu.',
    usage: ';add-bal <Nutzer> <Münzen>',
    async execute(message, args) {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send('Du hast nicht die nötigen berechtigungen.');
            return;
        }

        const mention = message.mentions.users.first();
        
        if(!mention) {
            message.reply('Bitte tagge einen Nutzer.');
            return;
        }

        const coins = args[1];
        if(isNaN(coins)) {
            message.reply('Bitte gebe die Münzen an.')
            return;
        }

        const guildId = message.guild.id;
        const userId = mention.id;

        const newCoins = await economy.addCoins(guildId, userId, coins);

        message.reply(`Du hast <@${userId}> ${coins} Münzen gegeben. Jetzt hat er/sie ${newCoins} Münzen.`)
    }
}