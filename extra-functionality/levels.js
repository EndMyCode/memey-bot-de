const mongo = require('./mongo');
const profileSchema = require('../schemas/profile-schema');
const economy = require('../extra-functionality/economy');

module.exports = (client) => {
    client.on('message', message => {
        if(message.author.bot) return;
        if(!message.guild) return;
        addXP(message.guild.id, message.member.id, Math.floor(Math.random() * (50 - 10 + 1) + 10), message);
    })
}

const getNeededXP = level => level * level * 100

const addXP = async(guildId, userId, xpToAdd, message) => {
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            }, {
                guildId,
                userId,
                $inc: {
                    xp: xpToAdd
                }
            }, {
                upsert: true,
                new: true
            });

            let {xp, level} = result;
            const needed = getNeededXP(level);

            if(xp >= needed) {
                ++level;
                economy.addCoins(guildId, userId, needed);
                xp -= needed;

                message.channel.send(`<@${userId}> ist auf Level ${level} aufgestiegen! Bis zum nächsten Level brauch er/sie noch ${needed} XP.`);

                await profileSchema.updateOne({
                    guildId,
                    userId
                }, {
                    level,
                    xp
                });
            }

            if(level == 10) {
                let user = message.member;
                let role = user.guild.roles.cache.find(role => role.name === "Sehr Aktiv");
                user.roles.add(role);
            }

            console.log('RESULT: ', result);
}

module.exports.addXP = addXP;