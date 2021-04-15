const shopitems = require('../extra-functionality/shopitems');
const economy = require('../extra-functionality/economy');

module.exports = {
    name: 'shop-buy',
    alias: 'buy',
    description: 'Kaufe etwas aus dem shop.',
    usage: ';shop-buy <Item>',
    async execute(message, args) {
        const item = args.join(' ');
        let price = '';
        const { member, guild } = message;
        const guildmember = guild.member(message.author);
        const coins = await economy.getCoins(guild.id, member.id);

        if(!item) {
            message.reply("Kein Item angegeben.");
            return;
        }

        shopitems.shopitems.forEach(shopitem => {
            if(item.toLowerCase() === shopitem.itemName.toLowerCase()) {
                price = shopitem.itemPrice;
                if(coins < price) {
                    message.reply("Nicht genug Münzen.");
                    return;
                } else {
                    shopitem.execute(member, guild, guildmember);
                    economy.addCoins(guild.id, member.id, price * -1);
                    message.reply("Gekauft");
                }
            }
        });
    }
}