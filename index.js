const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const Discord = require('discord.js');
const client = new Discord.Client();
 
const prefix = ';';

const mongo = require('./extra-functionality/mongo');
const levels = require('./extra-functionality/levels');
const thanksLeaderboard = require('./extra-functionality/thanks-leaderboard');
const moneyLeaderboard = require('./extra-functionality/money-leaderboard');
 
const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
 
  client.commands.set(command.name, command);
}
 
 
client.on('ready', async () => {
  console.log('Bot is online!');
  client.user.setPresence({
    activity: {
      name: `${prefix}help`
    }
  });

  levels(client);
  thanksLeaderboard(client);
  moneyLeaderboard(client);
  
  await mongo().then(mongoose => {
      console.log('Connected to mongo!');
  });
});

client.on('guildMemberUpdate', (oldMember, newMember) => {  // this event triggers when a member changes their nickname.
  if (newMember.displayName !== 'Memey') { // checks if the new nickname starts with a .
      newMember.setNickname('Memey') //changes the member's nickname back to their old nickname
          .catch(console.error);
  }
});
 
client.on('message', message =>{

  if(message.content.includes('discord.gg/')) {
    message.delete();
    message.channel.send('Keine Werbung für sich selber machen, guck dir auch die Regeln an.');
  }

  if(!message.content.startsWith(prefix) || message.author.bot) return;
 
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === 'test') {
    client.commands.get('test').execute(message, args);
  }

  if(command === 'help') {
    client.commands.get('help').execute(message, args);
  }

  if(command === 'poll') {
    client.commands.get('poll').execute(message, args);
  }

  if(command === 'support' || command === 'ticket') {
    client.commands.get('support').execute(message, args, client);
  }

  if(command === 'warn') {
    client.commands.get('warn').execute(message, args);
  }

  if(command === 'list-warnings' || command === 'lw') {
    client.commands.get('list-warnings').execute(message, args);
  }

  //#region economy
  if(command === 'bal' || command === 'balance') {
    client.commands.get('bal').execute(message, args);
  }

  if(command === 'add-bal' || command === 'add-balance' || command === 'addbal' || command === 'addbalance') {
    client.commands.get('add-bal').execute(message, args);
  }

  if(command === 'pay' || command === 'überweise' || command === 'transfer') {
    client.commands.get('pay').execute(message, args);
  }

  if(command === 'beg' || command === 'betteln') {
    client.commands.get('beg').execute(message, args, client);
  }

  if(command === 'shop-list') {
    client.commands.get('shop-list').execute(message, args);
  }

  if(command === 'shop-buy' || command === 'buy') {
    client.commands.get('shop-buy').execute(message, args);
  }

  if(command === 'roulette') {
    client.commands.get('roulette').execute(message, args);
  }

  if(command === 'danke' || command === 'thx') {
    client.commands.get('danke').execute(message, args);
  }

  if(command === 'thanks-leaderboard' || command === 'thxleaderboard' || command === 'thx-lb' || command === 'thxlb') {
    client.commands.get('thanks-leaderboard').execute(message, args);
  }

  if(command === 'money-leaderboard' || command === 'moneyleaderboard' || command === 'money-lb' || command === 'moneylb') {
    client.commands.get('money-leaderboard').execute(message, args);
  }
  //#endregion
});

client.login('TOKEN');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
