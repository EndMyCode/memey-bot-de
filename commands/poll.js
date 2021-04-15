const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    alias: "",
    description: "Startet eine Umfrage.",
    usage: ';poll <Frage>',
    execute(message, args, client){
        if(args[0] == null) {
            message.reply('Bitte stelle eine Frage.');
            return;
        }
        let poll = args.join(" ");
        const embed = new Discord.MessageEmbed().setTitle("UMFRAGE!!!").setAuthor(`<@${message.member.tag}>`).setDescription(poll);
        message.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('👍');
        sentEmbed.react('👎');
        })
        message.delete();
    }
}