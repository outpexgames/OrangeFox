exports.commands = [
  'kick',
  'ban',
  'bans',
  'uptime',
  'setusername',
  'invite',
  'purge'
]

var startTime = Date.now();
var config = require('../../config.json');

exports.kick = {
  usage: "@Discord_tag",
  description: 'Kick a user from the server, available for mods or higher',

  process: function(bot, msg, suffix) {
    if (!checkServer(msg)){
        return;
    } // check if in server

    if (!msg.member.hasPermission("KICK_MEMBERS")) {
      msg.channel.send("Access Denied :x:");
      return;
    }
    user = resolveUser(msg, suffix);
    if (!user) {
      msg.reply('**No user found** :x:');
      return;
    }
    if (user.id == bot.user.id) {
      msg.channel.send("Can't kick me :fox:");
      return;
    }
    user.kick().then((member) => {
       msg.channel.send(":wave: " + user.displayName + " has been successfully kicked :point_right: ");
   }).catch(() => {
       msg.channel.send("Access Denied :x:");
   });
  }
}


exports.ban = {
  usage: "@Discord_tag",
  description: "Ban a user from the server, usable for mods or higher",

  process: function(bot, msg, suffix) {
    if (!checkServer(msg)){
        return;
    } // check if in server

    if (!msg.member.hasPermission("BAN_MEMBERS")) {
      msg.channel.send("Access Denied :x:");
      return;
    }
    user = resolveUser(msg, suffix);
    if (!user) {
      msg.reply('**No user found** :x:');
      return;
    }
    if (user.id == bot.user.id) {
      msg.channel.send("Can't kick me :fox:");
      return;
    }
    user.ban().then((member) => {
       msg.channel.send(":wave: " + user.displayName + " has been successfully banned :point_right: ");
   }).catch(() => {
       msg.channel.send("Access Denied :x:");
   });
  }
}

exports.bans = {
	description: "returns the list of users who have been banned from this server",
	process: function(bot,msg,suffix){
    if (!checkServer(msg)){
        return;
    } // check if in server
    var bans;
    msg.guild.fetchBans()
     .then(function(bans) {
       if (bans.size == 0) {
         msg.channel.send("No one has been banned yet :white_check_mark:");
       } else {
         var res = "**Banned Users**\n";
         bans.forEach(function (user) {
          res += '\n :point_right: ' + user.username;
        })
         msg.channel.send(res);
       }
     })
     .catch(console.error);
	}
}

exports.setusername = {
  description: "sets the username of the bot. Note this can only be done twice an hour!",
  process: function(bot,msg,suffix) {
    if (!checkowner(msg)) {
      return;
    }
    bot.user.setUsername(suffix);
  }
}

exports.uptime = {
	usage: "",
	description: "returns the amount of time since the bot started",
	process: function(bot,msg,suffix){
		var now = Date.now();
		var msec = now - startTime;
		console.log("Uptime is " + msec + " milliseconds");
		var days = Math.floor(msec / 1000 / 60 / 60 / 24);
		msec -= days * 1000 * 60 * 60 * 24;
		var hours = Math.floor(msec / 1000 / 60 / 60);
		msec -= hours * 1000 * 60 * 60;
		var mins = Math.floor(msec / 1000 / 60);
		msec -= mins * 1000 * 60;
		var secs = Math.floor(msec / 1000);
		var timestr = "";
		if(days > 0) {
			timestr += days + " days ";
		}
		if(hours > 0) {
			timestr += hours + " hours ";
		}
		if(mins > 0) {
			timestr += mins + " minutes ";
		}
		if(secs > 0) {
			timestr += secs + " seconds ";
		}
		msg.channel.send(":clock1: **Uptime**: " + timestr);
	}
}

exports.invite = {
  description: "generates an invite link you can use to invite the bot to your server",
  process: function(bot,msg,suffix){
    msg.channel.send("invite link: https://discordapp.com/oauth2/authorize?client_id="+config.client_id+"&scope=bot&permissions=470019135");
  }
}

exports.purge = {
  usage: "<number>",
  description: "remove x amount of messages",
  process: function(bot, msg, suffix) {
    if (!serverAdmin(msg)) {
      return;
    }

    let msgcount = parseInt(suffix);
    if (isNaN(msgcount)) {
      return msg.reply('Numbers only :1234:');
    }
    if (msgcount < 2) {
      return msg.reply('Minimum purge is 2 messages or higher');
    }

    if (msgcount < 150 && msgcount > 100) {
      msg.channel.fetchMessages({limit: 100}).then(messages => msg.channel.bulkDelete(messages));
      todel = msgcount - 100;
      msg.channel.fetchMessages({limit: todel}).then(messages => msg.channel.bulkDelete(messages));
      return;
    }
    if (msgcount >= 150 && msgcount <= 1000) {
      var i = 1;
      var x = Math.round(msgcount/100);
      var y = msgcount/100;

      while (i <= x) {
        if (i === x) {
          m = i - 1;
          m = m * 100;
          todelete = msgcount - m;
          msg.channel.fetchMessages({limit: todelete}).then(messages => msg.channel.bulkDelete(messages));
        } else {
          msg.channel.fetchMessages({limit: 100}).then(messages => msg.channel.bulkDelete(messages));
        }
        i++;
      }
    } else {
      msg.channel.fetchMessages({limit: msgcount}).then(messages => msg.channel.bulkDelete(messages));
    }
  }
}

function checkServer(msg) {
  if (typeof msg.channel.guild == 'undefined') {
    return false;
  } else {
    return true;
  }
}

function serverAdmin(msg) {
  if (typeof msg.channel.guild == 'undefined') {
    return false; //pm so dont allow
  }
  if (!msg.member.hasPermission("ADMINISTRATOR")) {
    return false;
  } else {
    return true;
  }
}

function resolveUser(msg, suffix){
	var userid = suffix;
	if(suffix.startsWith('<@')){
		userid = suffix.substr(2,suffix.length-3);
	}
  try {
  	var user = msg.channel.guild.members.find(member => member.user.id === userid);
  	if(!user){
  		var user = msg.channel.guild.members.find(member => member.user.username === suffix);
  	}
  } catch (error) {
    return false;
  }
  if (user) {
	   return user;
  } else {
    return false;
  }
}

function checkowner(msg) {
  config = require('../../config.json');
  for (var admin in config.admins) {
    if (msg.author.id == admin) {
      return true;
    }
  }
  return false;
}
