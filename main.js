var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const poetry = require('./src/haiku.js');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function(user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `>`
    if (message.substring(0, 1) == '>') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var cmd1 = args[1];
        var cmd2 = args[2];

        args = args.splice(1);
        switch (cmd) {

            ////////////
            // >ping  //
            ////////////
            case 'ping':
            case 'Ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!:ping_pong:'
                });
                break;

            /////////////
            // >haiku  //
            /////////////
            case 'haiku':
            case 'Haiku':
            case 'HAIKU':
                bot.sendMessage({
                    to: channelID,
                    message: poetry.haiku()
                });
                break;
				
			////////////
            // >roll  //
            ////////////
            case 'roll':
            case 'Roll':
            case 'ROLL':
			
			var die = Math.floor(100*Math.random()).toString();
			var roll;
			
			if (die < 33) 		roll = '```css\n [' + die + ']```';
			else if (die < 66) 	roll = '```fix\n [' + die + ']```';
			else 				roll = '```ini\n [' + die + ']```';
			
                bot.sendMessage({
                    to: channelID,
                    message: roll
                });
                break;


            //////////////////
            // >I love you  //
            //////////////////
            case 'i':
            case 'I':
                if (cmd1 == 'love') {
                    if ((cmd2 == 'you') || (cmd2 == 'you,') || (cmd2 == 'you.')) {
                        bot.sendMessage({
                            to: channelID,
                            message: 'https://gfycat.com/VictoriousDeliriousGuillemot'
                        });
                    }
                }
                break;

                // Just add any case commands if you want to..
        }

    }
});