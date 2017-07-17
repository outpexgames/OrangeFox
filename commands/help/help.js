exports.commands = [
  'help'
]

exports.help = {
  description: 'Ask for help from the bot',

  process: function(bot, msg) {
    msg.reply("Sending help...");
    msg.author.send("**:fox: Available Commands: :fox:**").then(function(){
      var batch = "";
      var dbot = require("../../bot.js");
      var config = require('../../config.json');

      var sortedCommands = dbot.commands_keys().sort();
      for(var i in sortedCommands) {
        var cmd = sortedCommands[i];
        var info = "**"+config.prefix + cmd+"**";

        var usage = dbot.commands()[cmd].usage;
        if(usage){
          info += " " + usage;
        }
        var description = dbot.commands()[cmd].description;
        if(description instanceof Function){
          description = description();
        }
        if(description){
          info += "\n\t" + description;
        }
        var newBatch = batch + "\n" + info;
        if(newBatch.length > (1024 - 8)){ //limit message length
          msg.author.send(batch);
          batch = info;
        } else {
          batch = newBatch
        }
      }
      if(batch.length > 0){
        msg.author.send(batch);
      }
    });
  }
}
