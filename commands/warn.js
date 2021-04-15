const mongo = require('../extra-functionality/mongo');
const warnSchema = require('../schemas/warn-schema');

module.exports = {
    name: 'warn',
    alias: '',
    description: 'Warnt einen Nutzer.',
    usage: ';warn <Nutzer> <Grund>',
    async execute (message, args) {
        if(message.member.roles.cache.find(r => r.name === "Moderator") || message.member.roles.cache.find(r => r.name === "Administrator") || message.member.roles.cache.find(r => r.name === "Owner")) {
            const target = message.mentions.users.first();
            if(!target) {
                message.reply("Der Nutzer den du warnen möchtest fehlt.");
                return;
            }

            args.shift();

            const guildId = message.guild.id;
            const userId = message.member.id;
            const reason = args.join(' ');

            const warning = {
                author: message.member.user.tag,
                timestamp: new Date().getTime(),
                reason
            }
                    await warnSchema.findOneAndUpdate({
                        guildId, 
                        userId
                    }, {
                        guildId,
                        userId,
                        $push: {
                            warnings: warning
                        }
                    }, {
                        upsert: true
                    });
        } else {
            message.reply("Dir fehlen die nötigen berechtigungen.");
        }
    }
}