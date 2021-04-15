const economy = require('../extra-functionality/economy');

module.exports = {
    name: 'beg',
    alias: 'betteln',
    description: 'Bitte einen anderen Spieler um Geld.',
    usage: ';beg <Nutzer> <Geld>',
    execute(message, args, client) {
        const target = message.mentions.users.first();
        if(!target) {
            message.reply("Bitte wähle einen Nutzer aus.");
            return;
        }
        const targetId = target.id;
        const guild = message.guild;
        if(!guild) {
            message.reply("Bitte sei in einem Server.");
            return;
        }
        const guildId = guild.id;
        const member = message.member;
        const userId = member.id;

        const moneyBegged = args[1];

        const currentcoins = economy.getCoins(guildId, targetId);

        target.send(`<@${targetId}>, <@${member.id}> fragt dich nach ${moneyBegged} Münzen. Gibst du ihm/ihr sie? Antworte mit 👍 oder 👎.ANTWORTE NIEMALS 2 MAL MIT "👍".`).then(msg => {
            client.on('messageReactionAdd', (reaction, user) => {
                if(reaction.emoji.name === '👍') {
                    if(moneyBegged <= currentcoins) {
                    target.send(`Du hast <@${userId}> ${moneyBegged} Münzen gegeben.`);
                    } else {
                        target.send("Du hast nicht genug Münzen.");
                    }
                } else if (reaction.emoji.name === '👎') {
                    target.send('Ok.');
                }
            });
        });
        
        
    }
}