const economy = require('../extra-functionality/economy');

module.exports = {
    name: 'bal',
    alias: "",
    description: 'Zeigt dein momentanes Geld an.',
    usage: ';bal (<Nutzer>)',
    async execute (message, args) {
        const target = message.mentions.users.first() || message.author;
        if(!target) {
            message.reply('Wähle einen Nutzer aus.');
            return;
        }
        if(!message.guild) {
            message.reply("Bitte sei in einem Server");
            return;
        }
        const targetId = target.id;

        const guildId = message.guild.id;
        const userId = target.id;

        const coins = await economy.getCoins(guildId, userId);

        message.reply(`Dieser Nutzer hat ${coins} Münzen.`);
    }
}