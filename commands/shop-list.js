const shopitems = require('../extra-functionality/shopitems');

module.exports = {
    name: 'shop-list',
    alias: '',
    description: 'Zeigt dir alle Shop Items an.',
    usage: ';shop-list',
    execute(message, args) {
        shopitems.shopitems.forEach(item => {
            message.channel.send(`**${item.itemName}**\n${item.itemDescription}\nPreis: ${item.itemPrice} Münzen`);
        });
    }
}