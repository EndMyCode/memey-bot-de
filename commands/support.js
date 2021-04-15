const check = '✅';
let registered = false;

const registerEvent = (client, channel) => {
    if(registered) return;

    registered = true;

    console.log('TICKET REGISTERED!');

    client.on('messageReactionAdd', (reaction, user) => {
        if(user.bot) return;

        console.log('REAKTION ANNGENOMMEN!');
        if(reaction.message.channel.id === channel.id) {
            reaction.message.delete();
        }
    });
}

module.exports =  {
    name: 'support',
    alias: 'ticket',
    description: 'Schickt ein Support Ticket in den Support Kanal.',
    usage: ';support <Problem>',
    execute (message, args, client) {
        const {guild} = message;
        const channel = guild.channels.cache.find(c => c.name === "support");
        if(!channel) {
            message.reply('Kein "support" kanal vorhanden, bitte sage einem Administrator, dass dieser server einen support kanal braucht.');
            return;
        }

        registerEvent(client, channel);

        channel.send(`Ein neues Support Ticket wurde von <@${message.member.id}> erstellt.
        
        "${args.join()}"
        
        Drücke auf den ${check} wenn das Problem gelöst wurde.`).then((_message) => {
            _message.react(check);

            message.reply('Support Ticket wurde gesendet. Eine Antwort vom Support Team sollte bald kommen.');
            message.delete();
        });
    }
}