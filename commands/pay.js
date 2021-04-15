const economy = require('../extra-functionality/economy');

module.exports = {
    name: 'pay',
    alias: ['überweise', 'transfer'],
    description: 'Bezahle jemandem Geld.',
    usage: ';pay <Nutzer> <Geld(Zahl)>',
    async execute(message, args) {
        const target = message.mentions.users.first();
        if(!target) {
            message.reply("Bitte nenne jemanden den du bezahlen willst.");
            return;
        }

        const coinsToGive = args[1];
        if(isNaN(coinsToGive)) {
            message.reply(`Bitte sage wie viele du ${target} geben willst.`);
            return;
        }

        const coinsOwned = await economy.getCoins(message.guild.id, message.member.id);
        if(coinsOwned < coinsToGive) {
            message.reply("Du hast nicht genug Münzen.");
            return;
        }

        const remainingCoins = await economy.addCoins(message.guild.id, message.member.id, coinsToGive * -1);
        const newBalance = await economy.addCoins(message.guild.id, target.id, coinsToGive);

        message.reply(`Du hast <@${target.id}> ${coinsToGive} Münzen überwiesen. Er/Sie hat jetzt ${newBalance} Münzen und du ${remainingCoins} Münzen.`);
    }
}