const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'help',
    alias: "",
    description: 'Zeigt alle commands.',
    usage: ';help',
    execute(message, args) {
        fs.readdir("./commands/", (err, files) => {
            if(err) console.error(err);
    
            let jsfiles = files.filter(f => f.split(".").pop() === "js");
            if(jsfiles.length <= 0) {
                console.log("No commands to load!");
                return;
            }
    
            var namelist = "";
            var aliaslist = "";
            var desclist = "";
            var usage = "";
    
            let result = jsfiles.forEach((f, i) => {
                let props = require(`./${f}`);
                namelist = props.name;
                aliaslist = props.alias;
                desclist = props.description;
                usage = props.usage;
            
                // send help text
                if(aliaslist != ""){
                    message.channel.send(`**${namelist}, ${aliaslist}** \n${desclist} \n${usage}`);
                } else {
                    message.channel.send(`**${namelist}** \n${desclist} \n${usage}`);
                }
            });
        });
    }
}