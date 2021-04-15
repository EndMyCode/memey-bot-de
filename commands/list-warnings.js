const mongo = require('../extra-functionality/mongo');
const warnSchema = require('../schemas/warn-schema');

module.exports = {
    name: 'list-warnings',
    alias: 'lw',
    description: 'Listet alle Warnungen eines Nutzers auf.',
    usage: ';listwarnings <Nutzer>',
    async execute(message, args) {
        if(message.member.roles.cache.find(r => r.name === "Moderator") || message.member.roles.cache.find(r => r.name === "Administrator") || message.member.roles.cache.find(r => r.name === "Owner")) {
            const target = message.mentions.users.first();
            if(!target) {
                message.reply("Nenne bitte den Nutzer von dem die Warnungen abgerufen werden.")
                return;
            }

            const guildId = message.guild.id;
            const userId = message.member.id;
                    const results = await warnSchema.findOne({
                        guildId,
                        userId
                    });

                    let reply = `Vorherige Warnungen von <@${userId}>:\n\n`

                    for(const warning of results.warnings) {
                        const { author, timestamp, reason } = warning;

                        reply += `Von ${author} am ${new Date(timestamp).toLocaleDateString()} wegen ${reason}.\n`
                    }

                    message.reply(reply);
        } else {
            message.reply("Dir fehlen die nötigen Berechtigungen.");
        }
    }
}