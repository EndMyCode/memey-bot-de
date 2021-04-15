module.exports = {
    shopitems: [
        {
            itemName: 'Custom Command',
            itemDescription: 'EndMii muss einen Command machen welchen du dir aussuchst.',
            itemPrice: 400,
            execute(member, guild, guildmember) {
                let channel = guild.channels.cache.find(c => c.name === "shop");
                if(!channel) guild.channels.create('shop');
                channel = guild.channels.cache.find(c => c.name === "shop");
                channel.send(`${member} hat einen ${this.itemName} gekauft.`);
                return;
            }
        },
        {
            itemName: 'Rich Role',
            itemDescription: 'Einfach nur zum angeben, lel.',
            itemPrice: 10000,
            execute(member, guild, guildmember) {
                const role = guild.roles.cache.find(r => r.name === "Rich Guy");
                guildmember.roles.add(role);
            }
        }
    ]
}