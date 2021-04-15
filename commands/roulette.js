const economy = require('../extra-functionality/economy');

module.exports = {
    name: 'roulette',
    alias: '',
    description: 'Ein command bei welchem du eingesetzte Münzen gewinnnen oder verlieren kannst.',
    usage: ';roulette <Einsatz(Zahl)>',
    async execute(message, args) {
        const bet = args[0];
        if(!bet) {
            message.reply("Bitte sag wie viel du wetten willst.");
            return;
        }

        const coins = await economy.getCoins(message.guild.id, message.member.id);

        if(coins < bet) {
            message.reply(`Du kannst nicht spielen, deine Wette von ${bet} Münzen ist zu hoch für deine ${coins} Münzen.`);
            return;
        }

        const outcome = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        let finalOutcome;
        const rng = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        switch(rng) {
            case 1:
                finalOutcome = bet * outcome;
                break;
            case 2:
                finalOutcome = bet * -outcome;
                break;
            case 3:
                finalOutcome = bet * -outcome;
                break;

        }
        console.log(outcome);

        economy.addCoins(message.guild.id, message.member.id, finalOutcome);

        const newCoins = coins + finalOutcome;

        if(newCoins > coins) {
            message.reply(`Glückwunsch, du hast ${newCoins - coins} Münzen dazugewonnen. Du hast jetzt ${newCoins} Münzen`);
            return;
        } else {
            message.reply(`Autsch, du hast ${newCoins - coins} Münzen verloren... du hast jetzt insgesamt ${newCoins} Münzen`)
            if(newCoins < 0) {
                message.reply("Du solltest vielleicht dir mehr Geld besorgen..., du kannst bis zum nächsten Level Up warten oder betteln, falls du zu viel geld verloren hast, keine Sorge, dafür wird es auch bald ne Lösung geben.");
            }
            return;
        }
    }
}