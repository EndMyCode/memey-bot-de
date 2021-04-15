module.exports = {
    name: 'test',
    alias: "",
    description: "Wiederholt was du gesagt hast.",
    usage: ';test <Text>',
    execute(message, args){
        if(args[0] == null) {
            message.reply("Sage den Text den der Bot sagen soll.");
            return;
        } else {
            let msg = args.join();
            let finalmsg = msg.replace(","," ");
            message.channel.send(finalmsg);
            message.delete();
        }
    }
}