const Discord = require('discord.js');
const bot = new Discord.Client();
const os = require('os');
const music = require('./music_bot.js');
const antispam = require('./anti_spam.js');

var log4js = require('log4js');
var fs = require('fs');

var config = require('./config.json');

var log4js = require('log4js');
var logger = log4js.getLogger();

logger.level = 'debug';

bot.on('ready', () => {
  require('./init_commands.js').init();
  logger.info("Logged in! Serving in " + bot.guilds.array().length + " servers");
  logger.info(config.prefix+ "help to view a list of commands");
  bot.user.setGame(config.game);
  logger.info(bot.user.username + " is now playing: " + config.game);
});

music(bot, {
	prefix: config.prefix,        // Prefix of '-'.
	global: false,      // Server-specific queues.
	maxQueueSize: config.bot_channel.maxQueueSize,   // Maximum queue size of 10.
	clearInvoker: true, // If permissions applicable, allow the bot to delete the messages that invoke it (start with prefix)
  channel: config.bot_channel.music.channel    // Name of voice channel to join. If omitted, will instead join user's voice channel.
});

antispam(bot);

//welcome message
if (config.welcome.enabled) {
  logger.info("Welcome message enabled");
  bot.on("guildMemberAdd", (member) => {
    var welcometxt = config.welcome.message;
    welcometxt = welcometxt.replace('{server}', member.guild.name);
    welcometxt = welcometxt.replace('{user}', member.user.username);
    if (config.welcome.add_role.enabled) { //Add to role if set in config.
      var role = member.guild.roles.find("name", config.welcome.add_role.role);
      if (role) {
        member.addRole(role.id);
      } else {
        logger.error("Unable to add user to role: " + config.welcome.add_role.role);
      }
    }
  	member.guild.defaultChannel.send(welcometxt);
  });
}

bot.on('message', msg => {
  //check if bot channel set and if msg is in that channel
  if (config.bot_channel.enabled) {
    if (msg.channel.name !== config.bot_channel.channel && !serverAdmin(msg)) {
      return; //not in proper channel
    }
  }
  //check command
  if(msg.author.id != bot.user.id && (msg.content.startsWith(config.prefix))){
    logger.debug('Treating '+msg.content + ' from '+ msg.author.username +' as a command');
    command = msg.content.slice(1);
    command = command.split(" ");
    prefix = command[0]; //command

    var suffix = msg.content.replace(config.prefix+prefix,""); //suffix
    if (suffix.substring(0,1) == " ") {
      suffix = suffix.slice(1);
    }

    var cmd = commands[prefix];
    if (cmd) { //check if command exists
      cmd.process(bot,msg,suffix);
    } else {
      msg.channel.send(prefix + " not recognized as a command!").then((message => message.delete(5000)));
    }

  }
});

var commands = {
  "ping": {
    description: "Check if it's still alive.",
    process: function(bot, msg, suffix) {
      msg.reply('Pong! :ping_pong: ');
    }
  },

  "eval": {
    usage: "<command>",
    description: 'Executes javascript in the bot process. User must have "admin" permission',
    process: function(bot,msg,suffix) {
      if (checkAdmin(msg.author, config)) {
        const start = Date.now();
        try {
          response = eval(suffix);
          const end = Date.now();
          const embed = new Discord.RichEmbed()
          .setTitle('EVAL').setAuthor(msg.author.username, msg.author.avatarURL)
          .setDescription(`Finished evaluating in ${end - start} ms.`)
          .setColor(0x2ECC71) // green
          .addField('INPUT', `\`\`\`js\n${suffix}\n\`\`\``)
          .addField('RESULT', `\`\`\`js\n${response}\n\`\`\``);
          msg.channel.send({embed});
        } catch(error) {
          const end = Date.now();
          const embed = new Discord.RichEmbed()
          .setTitle('EVAL').setAuthor(msg.author.username, msg.author.avatarURL)
          .setDescription(`Finished evaluating in ${end - start} ms.`)
          .setColor(0xE74C3C) // red
          .addField('INPUT', `\`\`\`js\n${suffix}\n\`\`\``)
          .addField('ERROR', `\`\`\`js\n${error}\n\`\`\``);
          msg.channel.send({embed});
        }
      } else {
        msg.channel.send( msg.author + " You don't have permission to run eval commands :wave:");
      }
    }
  }
};

function checkAdmin(author, config) {
  for (var admin in config.admins) {
    if (author.id == admin) {
      return true;
    }
  }
  return false;
}

function serverAdmin(msg) {
  if (typeof msg.channel.guild == 'undefined') {
    return true; //pm so allow
  }
  if (!msg.member.hasPermission("ADMINISTRATOR")) {
    return false;
  } else {
    return true;
  }
}

exports.addCommand = function(commandName, commandObject) {
    try {
        commands[commandName] = commandObject;
    } catch(err){
        console.log(err);
    }
}
exports.commandCount = function() {
    return Object.keys(commands).length;
}
exports.commands_keys = function() {
  return Object.keys(commands);
}
exports.commands = function() {
  return commands;
}
exports.voice_connection = function() {
  return voice_connection;
}

bot.login(config.token);
