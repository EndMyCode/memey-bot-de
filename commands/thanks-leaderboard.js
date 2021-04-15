const thanksLeaderboardSchema = require('../schemas/thanks-leaderboard-schema');

module.exports = {
    name: 'thanks-leaderboard',
    alias: ['thxleaderboard', 'thxlb', 'thx-lb'],
    description: 'Bereitet ein leaderboard vor.',
    usage: ';thxlb',
    async execute(message, args) {
        const {guild, channel} = message;

        const guildId = guild.id;
        const channelId = channel.id;

        await thanksLeaderboardSchema.findOneAndUpdate({
            _id: guildId,
            channelId: channelId 
        }, {
            _id: guildId,
            channelId: channelId
        }, {
            upsert: true
        });

        message.reply('Bestenliste für danksagungen eingestellt.').then((message) => {
            message.delete({
                timeout: 1000 * 5
            });
        });
        message.delete();
    }
}