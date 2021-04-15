const thanksSchema = require('../schemas/thanks-schema');
const economy = require('../extra-functionality/economy');

module.exports = {
    name: 'danke',
    alias: 'thx',
    description: 'Bedanke dich bei einem Nutzer (grundloses bedanken wird bestraft, da der andere nutzer geld bekommt.)',
    usage: ';danke <Nutzer>',
    async execute(message, args) {
        const target = message.mentions.users.first();
        if(!target) {
            message.reply('Du musst dich auch bei jemandem bedanken.');
            return;
        }

        const { guild } = message;
        const guildId = guild.id;
        const targetId = target.id;
        const authorId = message.author.id;

        if(targetId === authorId) {
            message.reply('Du kannst dir nicht selber danken.');
            return;
        }

        const result = await thanksSchema.findOneAndUpdate({
            userId: targetId,
            guildId: guildId
        }, {
            userId: targetId,
            guildId: guildId,
            $inc: {
                received: 1
            }
        }, {
            upsert: true,
            new: true
        });

        economy.addCoins(guildId, targetId, result.received * 1000);

        const amount = result.received;
        message.reply(`Du hast dich bei <@${targetId}> bedankt. Dieser Person wurde insgesamt schon ${amount} mal sich bei ihr bedankt.`);
    }
}