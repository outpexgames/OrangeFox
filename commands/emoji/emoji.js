exports.commands = [
  'mojify'
]

translate = require('moji-translate');

exports.mojify = {
  usage: "<text>",
  description: "Convert regular text to emojis",
  process: function(bot, msg, suffix) {
    msg.channel.send(translate.translate(suffix));
  }
}
